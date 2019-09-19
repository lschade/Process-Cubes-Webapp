from process_cube.serializers import ProcessCubeStructureSerializer, DimensionSerializer, DimensionAttributeSerializer, DimensionElementSerializer, \
    ProcessCubeStructureDetailSerializer, DimensionElementDetailedSerializer
from process_cube.serializers import ValueGroupDateSerializer, ValueGroupSerializer, ValueGroupCategoricalElementSerializer, \
    ValueGroupNumberSerializer, ValueGroupCategoricalSerializer

from process_cube.models import ProcessCubeStructure, Dimension, DimensionAttribute, DimensionElement
from process_cube.models import ValueGroupNumber, ValueGroupDate, ValueGroup, ValueGroupCategoricalElement, ValueGroupCategorical

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action


class GetSerializerClassMixin(object):
    # https://medium.com/aubergine-solutions/decide-serializer-class-dynamically-based-on-viewset-actions-in-django-rest-framework-drf-fb6bb1246af2
    # https://stackoverflow.com/a/22922156

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
            print(self.action)
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()


def update_name(self, request, pk=None):
    name = request.data['name']

    obj = self.get_object()
    obj.name = name
    obj.save()

    return Response({'status': 'name set', 'new_name': name})


class ProcessCubeViewSet(GetSerializerClassMixin, viewsets.ModelViewSet):
    queryset = ProcessCubeStructure.objects.all()
    serializer_class = ProcessCubeStructureDetailSerializer

    serializer_action_classes = {
        'list': ProcessCubeStructureSerializer,
    }

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

        if (request.method == 'GET'):
            serializer = DimensionAttributeSerializer(dimension.attributes.all(), many=True, context=serializer_context)
            return Response(serializer.data)

        elif (request.method == 'POST'):
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

        elif (request.method == "DELETE"):
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

    @action(detail=True, methods=['get'], name="Values")
    def values(self, request, pk=None):
        serializer_context = {
            'request': request,
        }

        values = self.get_object().values.all()
        serializer = ValueGroupSerializer(values, many=True, context=serializer_context)
        return Response(serializer.data)


class ValueGroupDateViewSet(viewsets.ModelViewSet):
    queryset = ValueGroupDate.objects.all()
    serializer_class = ValueGroupDateSerializer


class ValueGroupNumberViewSet(viewsets.ModelViewSet):
    queryset = ValueGroupNumber.objects.all()
    serializer_class = ValueGroupNumberSerializer


class ValueGroupCategoricalViewSet(viewsets.ModelViewSet):
    queryset = ValueGroupCategorical.objects.all()
    serializer_class = ValueGroupCategoricalSerializer


class ValueGroupCategoricalElementViewSet(viewsets.ModelViewSet):
    queryset = ValueGroupCategoricalElement.objects.all()
    serializer_class = ValueGroupCategoricalElementSerializer


class ValueGroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ValueGroup.objects.all()
    serializer_class = ValueGroupSerializer


class DimensionElementViewSet(GetSerializerClassMixin, viewsets.ModelViewSet):
    queryset = DimensionElement.objects.all()
    serializer_class = DimensionElementDetailedSerializer

    serializer_action_classes = {
        'create': DimensionElementSerializer
    }

    @action(detail=True, methods=['get', 'post', 'delete'], name="Values")
    def values(self, request, pk=None):
        dimension_element = self.get_object()
        serializer_context = {
            'request': request,
        }

        if request.method == 'GET':
            pass
        elif request.method == 'POST':
            vgroup_id = request.data.get('value_group')
            vgroup = ValueGroup.objects.get(pk=vgroup_id)

            dimension_element.values.add(vgroup)
            dimension_element.save()
        elif request.method == 'DELETE':
            vgroup_id = request.data.get('value_group')
            vgroup = ValueGroup.objects.get(pk=vgroup_id)
            dimension_element.values.remove(vgroup)

        serializer = ValueGroupSerializer(dimension_element.values.all(), many=True, context=serializer_context)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer_context = {
            'request': request,
        }

        dimension_id = request.data.get('dimension')
        values_ids = request.data.get('values')

        dimension = Dimension.objects.get(pk=dimension_id)
        values = [ValueGroup.objects.get(pk=value_id) for value_id in values_ids]

        attributes = {value.attribute.id for value in values}
        if len(values) is not len(attributes):
            return Response({'status': 'Multiple values for one attribute'}, status=status.HTTP_400_BAD_REQUEST)

        element = DimensionElement.objects.create(dimension=dimension)
        element.values.set(values)

        serializer = DimensionElementDetailedSerializer(element, context=serializer_context)

        return Response(serializer.data)
