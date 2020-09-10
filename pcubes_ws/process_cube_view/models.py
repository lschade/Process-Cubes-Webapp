from django.db import models
from process_cube.models import DimensionAttribute, Dimension, ProcessCubeStructure
from event_log.models import EventLogAttribute


class ProcessCubeView(models.Model):
    name = models.CharField(max_length=255)
    case_level = models.BooleanField()
    pcs = models.ForeignKey(to=ProcessCubeStructure, on_delete=models.CASCADE)


class VisibleDimension(models.Model):
    pcv = models.ForeignKey(to=ProcessCubeView, on_delete=models.CASCADE, related_name="visible_dimensions")
    dimension = models.ForeignKey(to=Dimension, on_delete=models.CASCADE)


class Mapping(models.Model):
    """
    TODO: move to another app
    Map EventLogAttributes to DimensionAttributes
    """

    class Meta:
        unique_together = (('e_attribute', 'pcv'),)

    e_attribute = models.ForeignKey(to=EventLogAttribute, on_delete=models.CASCADE)
    d_attribute = models.ForeignKey(to=DimensionAttribute, on_delete=models.CASCADE)
    pcv = models.ForeignKey(to=ProcessCubeView, on_delete=models.CASCADE, related_name="mappings")

