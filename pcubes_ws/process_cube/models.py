from django.db import models
import math

# Create your models here.

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
    value = models.CharField(max_length=255)
    attribute = models.ForeignKey(to=Attribute, on_delete=models.CASCADE, related_name='values')

class Dimension(models.Model):
    cube = models.ForeignKey(to=ProcessCube, on_delete=models.CASCADE, related_name='dimensions')
    name = models.CharField(max_length=255)
    attributes = models.ManyToManyField(to=Attribute, through='DimensionAttribute', blank=True)


class DimensionAttribute(models.Model):
    class Meta:
        unique_together = (('dimension', 'attribute'),)

    dimension = models.ForeignKey(to=Dimension, on_delete=models.CASCADE)
    attribute = models.ForeignKey(to=Attribute, on_delete=models.CASCADE)
    case_level = models.BooleanField()

