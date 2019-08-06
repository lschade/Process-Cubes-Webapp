from django.db import models
from event_log.models import EventLogAttribute


class ProcessCubeStructure(models.Model):
    name = models.CharField(max_length=255)


class Dimension(models.Model):
    cube = models.ForeignKey(to=ProcessCubeStructure, on_delete=models.CASCADE, related_name="dimensions")
    name = models.CharField(max_length=255)


class DimensionAttribute(models.Model):
    dimension = models.ForeignKey(to=Dimension, on_delete=models.CASCADE, related_name="attributes")
    name = models.CharField(max_length=255)
    dtype = models.CharField(max_length=255)


class DimensionElement(models.Model):
    """
    Value-set: One element of a Dimension
    """
    dimension = models.ForeignKey(to=DimensionAttribute, on_delete=models.CASCADE, related_name='elements')


class ValueGroup(models.Model):
    """
    group attribute values
    """
    class Meta:
        unique_together = (('attribute', 'd_element'),)

    attribute = models.ForeignKey(to=DimensionAttribute, on_delete=models.CASCADE)
    d_element = models.ForeignKey(to=DimensionElement, on_delete=models.CASCADE)


class ValueGroupDate(ValueGroup):
    """
    Date Group: defines a start and end date
    """
    start = models.DateTimeField()
    end = models.DateTimeField()
    group = models.OneToOneField(to=ValueGroup, on_delete=models.CASCADE, parent_link=True)


class ValueGroupNumber(ValueGroup):
    """
    Numerical Group: defines a lower and upper bound
    """
    lower = models.FloatField()
    upper = models.FloatField()
    group = models.OneToOneField(to=ValueGroup, on_delete=models.CASCADE, parent_link=True)


class ValueGroupCategorical(ValueGroup):
    """
    Categorical Group: Categorical values can be grouped to one ValueGroupCategorical
    """
    dimension = models.ForeignKey(to=Dimension, on_delete=models.CASCADE)
    group = models.OneToOneField(to=ValueGroup, on_delete=models.CASCADE, parent_link=True)


class ValueGroupCategoricalElement(models.Model):
    """
    One value in the value-set of a CategoricalElement in a ValueGroupCategorical.
    """
    value = models.CharField(max_length=255)
    vc_group = models.ForeignKey(to=ValueGroupCategorical, on_delete=models.CASCADE)


class DimensionElementGroup(models.Model):
    """
    A group of DimensionElements
    """
    dimension = models.ForeignKey(to=Dimension, on_delete=models.CASCADE)


class DimensionElementGroupElement(models.Model):
    """
    One group item in a DimensionElementGroup
    """
    group = models.ForeignKey(to=DimensionElementGroup, on_delete=models.CASCADE)
    d_element = models.ForeignKey(to=DimensionElement, on_delete=models.CASCADE)


