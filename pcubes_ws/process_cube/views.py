from process_cube.serializers import ProcessCubeStructureSerializer, DimensionSerializer, DimensionAttributeSerializer
from process_cube.models import ProcessCubeStructure, Dimension, DimensionAttribute

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action


class GetSerializerClassMixin(object):
    # https://medium.com/aubergine-solutions/decide-serializer-class-dynamically-based-on-viewset-actions-in-django-rest-framework-drf-fb6bb1246af2

    def get_serializer_class(self):
        """
        A class which inhertis this mixins should have variable
        `serializer_action_classes`.
        Look for serializer class in self.serializer_action_classes, which
        should be a dict mapping action name (key) to serializer class (value),
        i.e.:
        class SampleViewSet(viewsets.ViewSet):
            serializer_class = DocumentSerializer
            serializer_action_classes = {
               'upload': UploadDocumentSerializer,
               'download': DownloadDocumentSerializer,
            }
            @action
            def upload:
                ...
        If there's no entry for that action then just fallback to the regular
        get_serializer_class lookup: self.serializer_class, DefaultSerializer.
        """
        try:
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()


def update_name(self, request, pk=None):
    name = request.data['name']

    obj = self.get_object()
    obj.name = name
    obj.save()

    return Response({'status': 'name set', 'new_name': name})


class ProcessCubeViewSet(viewsets.ModelViewSet):
    queryset = ProcessCubeStructure.objects.all()
    serializer_class = ProcessCubeStructureSerializer

    @action(detail=True, methods=['put'], name="Change name")
    def set_name(self, request, pk=None):
        return update_name(self, request, pk)


class DimensionViewSet(GetSerializerClassMixin, viewsets.ModelViewSet):
    queryset = Dimension.objects.all()
    serializer_class = DimensionSerializer

    serializer_action_classes = {
        'attributes': DimensionAttributeSerializer
    }

    @action(detail=True, methods=['put'], name="Change name")
    def set_name(self, request, pk=None):
        return update_name(self, request, pk)

    @action(detail=True, methods=['get', 'post', 'delete'], name="Add Attribute")
    def attributes(self, request, pk=None):
        dimension = self.get_object()
        serializer_context = {
            'request': request,
        }

        if(request.method == 'GET'):
            serializer = DimensionAttributeSerializer(dimension.attributes.all(), many=True, context=serializer_context)
            return Response(serializer.data)

        elif(request.method == 'POST'):
            attr_name = request.data.get('name')
            dtype = request.data.get('dtype')

            print(request.data)

            print(attr_name)
            print(dtype)

            try:
                attr = DimensionAttribute.objects.create(dimension=dimension, dtype=dtype, name=attr_name)
                print(attr.pk)
                attr_serializer = DimensionAttributeSerializer(attr, context=serializer_context)
                return Response(attr_serializer.data)
            except Exception as e:
                return Response({'status': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        elif(request.method == "DELETE"):
            attr_id = request.data['attribute']
            try:
                DimensionAttribute.objects.get(pk=attr_id).delete()
            except Exception as e:
                return Response({'status': e.message}, status=status.HTTP_400_BAD_REQUEST)

        dimension = Dimension.objects.get(pk=pk)
        serializer = DimensionSerializer(dimension, context=serializer_context)

        return Response(serializer.data)


class DimensionAttributeViewSet(viewsets.ModelViewSet):
    queryset = DimensionAttribute.objects.all()
    serializer_class = DimensionAttributeSerializer

    @action(detail=True, methods=['put'], name="Change name")
    def set_name(self, request, pk=None):
        return update_name(self, request, pk)
