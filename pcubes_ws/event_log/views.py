from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from event_log.models import EventLog, EventLogAttribute
from event_log.serializers import EventLogAttributeSerializer, EventLogSerializer


def update_name(self, request, pk=None):
    name = request.data['name']

    obj = self.get_object()
    obj.name = name
    obj.save()

    return Response({'status': 'name set', 'new_name': name})


class EventLogViewSet(viewsets.ModelViewSet):
    queryset = EventLog.objects.all()
    serializer_class = EventLogSerializer

    @action(detail=True, methods=['put'], name="Change name")
    def set_name(self, request, pk=None):
        return update_name(self, request, pk)


class EventLogAttributeViewSet(viewsets.ModelViewSet):
    queryset = EventLogAttribute.objects.all()
    serializer_class = EventLogAttributeSerializer

    @action(detail=True, methods=['put'], name="Change name")
    def set_name(self, request, pk=None):
        return update_name(self, request, pk)


