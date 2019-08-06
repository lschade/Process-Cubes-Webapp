from django.db import models
import math

# http://www.padsweb.rwth-aachen.de/wvdaalst/publications/p826.pdf


class EventLog(models.Model):
    name = models.CharField(max_length=255)


class ProcessCube(models.Model):
    name = models.CharField(max_length=255)
    log = models.ForeignKey(to=EventLog, on_delete=models.CASCADE)
    case_level = models.BooleanField()


class Attribute(models.Model):
    name = models.CharField(max_length=255)
    log = models.ForeignKey(to=EventLog, on_delete=models.CASCADE)
    case_attribute = models.BooleanField()
    queryname = models.CharField(max_length=255)
    dtype = models.CharField(max_length=255)


class AttributeValue(models.Model):
    """
    Values the attribute can take. Called universe (U_V) in the paper
    """
    value = models.CharField(max_length=255)
    attribute = models.ForeignKey(to=Attribute, on_delete=models.CASCADE, related_name='values')


class Dimension(models.Model):
    cube = models.ForeignKey(
        to=ProcessCube, on_delete=models.CASCADE, related_name='dimensions')
    name = models.CharField(max_length=255)
    attributes = models.ManyToManyField(
        to=Attribute, through='DimensionAttribute', blank=True)


class DimensionAttribute(models.Model):
    class Meta:
        unique_together = (('dimension', 'attribute'),)

    dimension = models.ForeignKey(to=Dimension, on_delete=models.CASCADE, related_name="dimension_attributes")
    attribute = models.ForeignKey(to=Attribute, on_delete=models.CASCADE)
    case_level = models.BooleanField()


class DimensionHierarchy(models.Model):
    """
    The actual elements of the dimension. Called hier in paper
    It is a set of dimension elements
    """
    dimension = models.ForeignKey(to=Dimension, on_delete=models.CASCADE, related_name="hierarchies")


class DimensionElement(models.Model):
    """
    Possible set of values for the dimension. Called type in paper
    It is a set of AttributeValues. Defines for each attribute of the dimension one AttributeValue
    Actually, only exists to create DimensionHierarchies
    """
    dimension = models.ForeignKey(to=Dimension, on_delete=models.CASCADE, related_name="elements")
    hierarchy = models.ForeignKey(to=DimensionHierarchy, on_delete=models.CASCADE, related_name="elements", null=True, blank=True)

