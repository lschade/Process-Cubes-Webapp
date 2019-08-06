from rest_framework.parsers import FileUploadParser, FormParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from event_log.models import EventLogAttribute as Attribute, EventLog

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
    event_attributes2 = {(k, k2) for trace in log for event in trace for (k, v) in event.items()
                         if type(v) == dict for (k2, v2) in v['children'].items()}
    trace_attributes2 = {(k, k2) for trace in log for k, v in trace.attributes.items()
                         if type(v) == dict for (k2, v2) in v['children'].items()}

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

    # Construct Attribute objects
    t1 = time.time()
    all_attributes = [Attribute(name=attr, queryname=attr, case_attribute=False, log=event_log, dtype='str') for attr in event_attributes] + [
        Attribute(name=attr, queryname="trace:" + attr, case_attribute=True, log=event_log, dtype='str') for attr in trace_attributes] + [
        Attribute(name=k2, queryname='trace:' + k + '.children.' + k2, case_attribute=True, log=event_log, dtype='str') for (k, k2) in trace_attributes2] + [
        Attribute(name=k2, queryname=k + '.children.' + k2, case_attribute=False, log=event_log, dtype='str') for (k, k2) in event_attributes2]

    Attribute.objects.bulk_save(all_attributes)
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
