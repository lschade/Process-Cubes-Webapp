from rest_framework import serializers
from process_cube_view.models import ProcessCubeView, VisibleDimension, Mapping


class ProcessCubeViewSerializer(serializers.HyperlinkedModelSerializer):
    visible_dimensions = serializers.HyperlinkedRelatedField(
        many=True, read_only=True, view_name='visibledimension-detail')

    class Meta:
        model = ProcessCubeView
        fields = ['id', 'name', 'pcs', 'case_level', 'visible_dimensions']


class VisibleDimensionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = VisibleDimension
        fields = ['id', 'pcv', 'dimension']


class MappingSerializer(serializers.HyperlinkedModelSerializer):
    visible_dimensions = serializers.HyperlinkedRelatedField(
        many=True, read_only=True, view_name='visible_dimensions-detail')

    class Meta:
        model = ProcessCubeView
        fields = ['id', 'pcv', 'e_attribute', 'd_attribute']



