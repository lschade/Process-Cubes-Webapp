from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from process_cube_view.models import ProcessCubeView, VisibleDimension, Mapping
from process_cube_view.serializers import ProcessCubeViewSerializer, VisibleDimensionSerializer, MappingSerializer


def update_name(self, request, pk=None):
    name = request.data['name']

    obj = self.get_object()
    obj.name = name
    obj.save()

    return Response({'status': 'name set', 'new_name': name})


class ProcessCubeViewViewSet(viewsets.ModelViewSet):
    queryset = ProcessCubeView.objects.all()
    serializer_class = ProcessCubeViewSerializer

    @action(detail=True, methods=['put'], name="Change name")
    def set_name(self, request, pk=None):
        return update_name(self, request, pk)


class VisibleDimensionViewSet(viewsets.ModelViewSet):
    queryset = VisibleDimension.objects.all()
    serializer_class = VisibleDimensionSerializer


class MappingViewSet(viewsets.ModelViewSet):
    queryset = Mapping.objects.all()
    serializer_class = MappingSerializer
