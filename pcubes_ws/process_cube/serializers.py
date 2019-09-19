from rest_framework import serializers
from process_cube.models import ProcessCubeStructure, Dimension, DimensionAttribute, DimensionElement
from process_cube.models import ValueGroup, ValueGroupCategorical, ValueGroupCategoricalElement, ValueGroupDate, \
    ValueGroupNumber


class EagerLoadingMixin:
    @classmethod
    def setup_eager_loading(cls, queryset):
        if hasattr(cls, "_SELECT_RELATED_FIELDS"):
            queryset = queryset.select_related(*cls._SELECT_RELATED_FIELDS)
        if hasattr(cls, "_PREFETCH_RELATED_FIELDS"):
            queryset = queryset.prefetch_related(*cls._PREFETCH_RELATED_FIELDS)
        return queryset


class ValueGroupDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValueGroupDate
        fields = ['id', 'start', 'end', 'attribute']


class ValueGroupNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValueGroupNumber
        fields = ['id', 'lower', 'upper', 'attribute']


class ValueGroupCategoricalSerializer(serializers.ModelSerializer):
    elements = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = ValueGroupCategorical
        fields = ['id', 'attribute', 'elements']


class ValueGroupCategoricalElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValueGroupCategoricalElement
        fields = ['value', 'vc_group']


class ValueGroupSerializer(serializers.ModelSerializer):
    impl = serializers.SerializerMethodField()
    dtype = serializers.SerializerMethodField()

    class Meta:
        model = ValueGroup
        fields = ['id', 'attribute', 'impl', 'dtype']

    def get_impl(self, obj):
        try:
            impl = obj.valuegroupdate
            serializer = ValueGroupDateSerializer(impl)
            return serializer.data
        except ValueGroup.DoesNotExist:
            pass

        try:
            impl = obj.valuegroupnumber
            serializer = ValueGroupNumberSerializer(impl)
            return serializer.data
        except ValueGroup.DoesNotExist:
            pass

        try:
            impl = obj.valuegroupcategorical
            serializer = ValueGroupCategoricalSerializer(impl)
            return serializer.data
        except ValueGroup.DoesNotExist:
            pass

        return ''

    def get_dtype(self, obj):
        try:
            impl = obj.valuegroupdate
            return 'date'
        except ValueGroup.DoesNotExist:
            pass

        try:
            impl = obj.valuegroupnumber
            return 'number'
        except ValueGroup.DoesNotExist:
            pass

        try:
            impl = obj.valuegroupcategorical
            return 'categorical'
        except ValueGroup.DoesNotExist:
            pass

        return ''


class DimensionAttributeSerializer(serializers.ModelSerializer):
    values = serializers.SerializerMethodField()

    # values = ValueGroupSerializer(many=True, read_only=True)

    class Meta:
        model = DimensionAttribute
        fields = ['id', 'name', 'dtype', 'values']

    def get_values(self, obj):
        serializer = ValueGroupSerializer()
        values = [serializer.get_impl(v) for v in obj.values.all()]
        return values


class DimensionElementSerializer(serializers.ModelSerializer):
    values = serializers.PrimaryKeyRelatedField(read_only=False, many=True, queryset=ValueGroup.objects.all())

    class Meta:
        model = DimensionElement
        fields = ['id', 'dimension', 'values']


class DimensionElementDetailedSerializer(serializers.ModelSerializer):
    values = ValueGroupSerializer(read_only=True, many=True)

    class Meta:
        model = DimensionElement
        fields = ['id', 'dimension', 'values']


class DimensionSerializer(serializers.ModelSerializer):
    attributes = DimensionAttributeSerializer(many=True, read_only=False, default=[])
    elements = DimensionElementDetailedSerializer(many=True, read_only=True)

    class Meta:
        model = Dimension
        fields = ['id', 'name', 'cube', 'attributes', 'elements']

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


class SimpleDimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimension
        fields = ['id', 'name']


class ProcessCubeStructureSerializer(serializers.ModelSerializer):
    dimensions = SimpleDimensionSerializer(many=True, read_only=True)

    class Meta:
        model = ProcessCubeStructure
        fields = ['id', 'name', 'dimensions']
        # depth = 1


class ProcessCubeStructureDetailSerializer(serializers.ModelSerializer):
    dimensions = DimensionSerializer(many=True, read_only=True)

    class Meta:
        model = ProcessCubeStructure
        fields = ['id', 'name', 'dimensions']
