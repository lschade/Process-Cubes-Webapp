from rest_framework.parsers import FileUploadParser, FormParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from process_cube.models import Attribute, EventLog, AttributeValue

from pm4py.objects.log.importer.xes import factory as xes_importer
from datetime import datetime
from pymongo import MongoClient
from pcubes_ws.settings import DATABASES
import time
import tempfile


class FileUploadView(APIView):
    parser_classes = [FormParser, MultiPartParser]

    def put(self, request, format=None):
        print(request.data)
        print(request.FILES)
        file_obj = request.data['file']
        
        
        fp = tempfile.NamedTemporaryFile(suffix=".xes")
        fp.close()
        with open(fp.name, 'wb') as f:
            f.write(file_obj.read())

        log_id = import_xes(fp.name)

        return Response({'log': log_id})


# Pymongo is used directly to import events, because with Django models it's very slow for large files
# and I found no way to realize Models with "dynamic fields"


def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False


def import_xes(xes_file):
    t_start = time.time()
    # TODO: maybe not the best way to connect to the db
    client = MongoClient(host=DATABASES['mongo']['HOST'])
    db = client[DATABASES['mongo']['NAME']]
    trace_collection = db['traces']
    event_collection = db['events']

    t1 = time.time()
    # raw log from file
    log = xes_importer.import_log(xes_file)
    t2 = time.time()
    print('xes_importer.import_log: ' + str(t2 - t1))
    # delete file after import?
    # os.remove(xes_file)

    # Get name log log, if specified
    if('concept:name' in log.attributes):
        log_name = xes_file + ': ' + log.attributes['concept:name']
    else:
        log_name = xes_file

    # Construct event log object
    event_log = EventLog(name=log_name)
    event_log.save()
    log_id = event_log.id

    # Helper Functions

    def add_log_id(trace):
        trace['log'] = log_id
        return trace

    def add_trace_attrs(e, trace):
        for tattr in trace:
            if tattr != 'log':
                e['trace:' + tattr] = trace[tattr]

        e['log'] = log_id
        return e
    # --------

    # Collect all attributes
    t1 = time.time()
    event_attributes = {
        attr for trace in log for event in trace for (attr, v) in event.items() if type(v) is not dict}

    trace_attributes = {attr for trace in log for (
        attr, v) in trace.attributes.items() if type(v) is not dict}

    # Dict attributes, make each key of the dict to an attribute
    event_attributes2 = {(k, k2) for trace in log for event in trace for (
        k, v) in event.items() if type(v) == dict for (k2, v2) in v['children'].items()}
    trace_attributes2 = {(k, k2) for trace in log for k, v in trace.attributes.items(
    ) if type(v) == dict for (k2, v2) in v['children'].items()}

    t2 = time.time()
    print('time to find all attributes list: ' + str(t2 - t1))
    # ---------------

    # Collect traces + events
    t1 = time.time()
    all_traces = [add_log_id(trace.attributes) for trace in log]
    trace_collection.insert_many(all_traces, ordered=False)
    t2 = time.time()
    print('collect and save traces: ' + str(t2 - t1))

    t1 = time.time()
    all_events = [add_trace_attrs(event._dict, trace.attributes)
                  for trace in log for event in trace._list]

    t2 = time.time()
    print('time to construct events list: ' + str(t2 - t1))

    # Helper functions to find all possible values of the attributes

    def find_values(attr):
        values = {event[attr] for event in all_events if attr in event}
        return list(values)

    # Values of attribute with parent (trace)
    def find_values_p(attr, parent):
        return find_values(parent + ":" + attr)

    # Values of dictionary attribute
    def find_values_d(attr, d_name):
        values = {event[d_name]['children'][attr]
                  for event in all_events if d_name in event if attr in event[d_name]['children']}
        return list(values)

    # Values of dictionary attribute with given parent
    def find_values_d_p(attr, parent, d_name):
        d_name = parent + ":" + d_name
        return find_values_d(attr, d_name)
    # -------------

    # Construct Attribute objects and collect all possible values
    t1 = time.time()
    attributes_1 = [Attribute(name=attr, queryname=attr, case_attribute=False, log=event_log, dtype='str') for attr in event_attributes] + [
        Attribute(name=attr, queryname="trace:" + attr, case_attribute=True, log=event_log, dtype='str') for attr in trace_attributes]
    attributes_dict = [Attribute(name=k2, queryname='trace:' + k + '.children.' + k2, case_attribute=True, log=event_log, dtype='str') for (k, k2) in trace_attributes2] + [
        Attribute(name=k2, queryname=k + '.children.' + k2, case_attribute=False, log=event_log, dtype='str') for (k, k2) in event_attributes2]

    all_attributes = attributes_1 + attributes_dict

    # needs rework, not a safe method to find out the datatype
    def find_dtype(attr, values):
        if(type(values[0]) == datetime):
            attr.dtype = "date"
        elif(type(values[0]) == str):
            if(is_number(values[0])):
                attr.dtype = "float"
                for ev in all_events:
                    if(attr.queryname in ev):
                        ev[attr.queryname] = float(ev[attr.queryname])
                values = list(map(float, values))
            else:
                attr.dtype = "str"
        elif(type(values[0]) == int):
            attr.dtype = "int"
        elif(type(values[0]) == float):
            attr.dtype = "float"
        elif(type(values[0]) == bool):
            attr.dtype = "bool"
        else:
            attr.dtype = "str"

        return values

    for attr in attributes_1:
        attr.save()
        attr_name = attr.name
        if(attr.case_attribute):
            attr_name = "trace:" + attr.name

        values = find_values(attr_name)
        values = find_dtype(attr, values)

        attr_values = [AttributeValue(value=v, attribute=attr) for v in values]
        AttributeValue.objects.bulk_create(attr_values)

        attr.save()

    for attr in attributes_dict:
        attr.save()
        attr_name = attr.name
        d_name = attr.queryname.split('.children.')[0]
        
        values = find_values_d(attr_name, d_name)
        values = find_dtype(attr, values)

        attr_values = [AttributeValue(value=v, attribute=attr) for v in values]
        AttributeValue.objects.bulk_create(attr_values)

        attr.save()
        
    t2 = time.time()
    print('time to get values of attributes: ' + str(t2 - t1))
    # ---------------

    # Save events
    t1 = time.time()
    event_collection.insert_many(all_events, ordered=False)
    t2 = time.time()
    print('time to save events: ' + str(t2 - t1))

    print('#Traces: ' + str(len(all_traces)))
    print('#Events: ' + str(len(all_events)))
    # ----------------

    

    t_end = time.time()
    print('Total: ' + str(t_end - t_start))

    return log_id
