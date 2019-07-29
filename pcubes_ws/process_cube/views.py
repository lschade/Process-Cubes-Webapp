from django.shortcuts import render
from process_cube.serializers import EventLogSerializer, ProcessCubeSerializer, DimensionSerializer, AttributeSerializer
from process_cube.models import EventLog, ProcessCube, Dimension, Attribute, DimensionAttribute
from rest_framework import viewsets, status

from rest_framework.response import Response
from rest_framework.decorators import action
# Create your views here.


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


class ProcessCubeViewSet(viewsets.ModelViewSet):
    queryset = ProcessCube.objects.all()
    serializer_class = ProcessCubeSerializer

    @action(detail=True, methods=['put'], name="Change name")
    def set_name(self, request, pk=None):
        return update_name(self, request, pk)


class DimensionViewSet(viewsets.ModelViewSet):
    queryset = Dimension.objects.all()
    serializer_class = DimensionSerializer

    @action(detail=True, methods=['put'], name="Change name")
    def set_name(self, request, pk=None):
        return update_name(self, request, pk)

    @action(detail=True, methods=['post'], name="Add Attribute")
    def add_attribute(self, request, pk=None):
        dimension = self.get_object()

        attr_id = request.data['attr_id']
        case_level = request.data['case_level']
        try:
            attribute = Attribute.objects.get(pk=attr_id)
        except:
            return Response({'status': "attribute not found"}, status=status.HTTP_400_BAD_REQUEST)

        DimensionAttribute.objects.create(dimension=dimension, attribute=attribute, case_level=case_level)
        return Response({'status': 'added attribute'})


class AttributeViewSet(viewsets.ModelViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer

    @action(detail=True, methods=['put'], name="Change name")
    def set_name(self, request, pk=None):
        return update_name(self, request, pk)

    @action(detail=True, methods=['get'], name="Get values")
    def values(self, request, pk=None):
        values = self.get_object().values.all()
        values = [v.value for v in values]
        return Response({'values': values})
