from rest_framework import serializers
from event_log.models import  EventLog, EventLogAttribute


class EventLogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventLog
        fields = ['id', 'name']


class EventLogAttributeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventLogAttribute
        fields = ['id', 'name', 'log', 'db_query', 'case_attribute']

