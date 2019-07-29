from rest_framework import serializers
from process_cube.models import ProcessCube, Attribute, Dimension, EventLog, DimensionAttribute, AttributeValue


class EventLogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventLog
        fields = ['id', 'name']


class ProcessCubeSerializer(serializers.HyperlinkedModelSerializer):
    dimensions = serializers.HyperlinkedRelatedField(
        many=True, read_only=True, view_name='dimension-detail')

    class Meta:
        model = ProcessCube
        fields = ['id', 'name', 'log', 'case_level', 'dimensions']


class DimensionAttributeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DimensionAttribute
        fields = ['attribute', 'case_level']


class DimensionSerializer(serializers.HyperlinkedModelSerializer):
    attributes = DimensionAttributeSerializer(
        many=True, read_only=False, default=[], source="dimensionattribute_set")

    class Meta:
        model = Dimension
        fields = ['id', 'name', 'cube', 'attributes']

    def create(self, validated_data):
        try:
            dim_attr_set = validated_data.pop('dimensionattribute_set')
        except:
            dim_attr_set = []

        print(validated_data)
        dimension = Dimension.objects.create(**validated_data)

        for dim_attr in dim_attr_set:
            attribute = dim_attr['attribute']
            case_level = dim_attr['case_level']
            DimensionAttribute.objects.create(
                dimension=dimension, attribute=attribute, case_level=case_level)

        return dimension


class AttributeSerializer(serializers.HyperlinkedModelSerializer):
    # values = serializers.SerializerMethodField('get_values')

    class Meta:
        model = Attribute
        fields = ['id', 'name', 'queryname', 'log',
                  'dtype', 'case_attribute']

    # def get_values(self, obj):
    #     return [v.value for v in obj.values.all()]


    def create(self, validated_data):
        try:
            values_set = validated_data.pop('values')
        except:
            values_set = []

        attribute = Attribute.objects.create(**validated_data)

        for value_set in values_set:
            value = value_set['value']
            attr_value = AttributeValue.objects.create(
                attribute=attribute, value=value)

        return attribute


