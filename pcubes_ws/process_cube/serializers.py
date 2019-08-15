from rest_framework import serializers
from process_cube.models import ProcessCubeStructure, Dimension, DimensionAttribute


class DimensionAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DimensionAttribute
        fields = ['id', 'name', 'dtype']


class DimensionSerializer(serializers.ModelSerializer):
    attributes = DimensionAttributeSerializer(many=True, read_only=False, default=[])
    cube = serializers.PrimaryKeyRelatedField(queryset=ProcessCubeStructure.objects.all())

    class Meta:
        model = Dimension
        fields = ['id', 'name', 'cube', 'attributes']

    def create(self, validated_data):
        try:
            dim_attr_set = validated_data.pop('attributes')
        except:
            dim_attr_set = []

        print(validated_data)
        dimension = Dimension.objects.create(**validated_data)

        for dim_attr in dim_attr_set:
            attr_name = dim_attr['name']
            dtype = dim_attr['dtype']
            DimensionAttribute.objects.create(
                dimension=dimension, name=attr_name, dtype=dtype)

        return dimension


class ProcessCubeStructureSerializer(serializers.ModelSerializer):
    dimensions = DimensionSerializer(many=True, read_only=True)

    class Meta:
        model = ProcessCubeStructure
        fields = ['id', 'name', 'dimensions']

