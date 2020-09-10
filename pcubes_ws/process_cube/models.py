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


class ValueGroup(models.Model):
    """
    kind of 'abstract': should always come along with an element that overrides ValueGroup
    group attribute values
    """
    attribute = models.ForeignKey(to=DimensionAttribute, on_delete=models.CASCADE, related_name="values")

    def get_impl(self):
        if self.attribute.dtype == "date":
            return self.valuegroupdate
        elif self.attribute.dtype == "float":
            return self.valuegroupnumber
        else:
            return self.valuegroupcategorical

        return None

    def serialize(self):
        return {'err': 'not implemented'}


class ValueGroupDate(ValueGroup):
    """
    Date Group: defines a start and end date
    """
    start = models.DateTimeField()
    end = models.DateTimeField()
    group = models.OneToOneField(to=ValueGroup, on_delete=models.CASCADE, parent_link=True, primary_key=True,
                                 related_name='valuegroupdate')

    def serialize(self):
        return {
            'id': self.id,
            'start': self.start,
            'end': self.end,
        }


class ValueGroupNumber(ValueGroup):
    """
    Numerical Group: defines a lower and upper bound
    """
    lower = models.FloatField()
    upper = models.FloatField()
    group = models.OneToOneField(to=ValueGroup, on_delete=models.CASCADE, parent_link=True, primary_key=True,
                                 related_name='valuegroupnumber')

    def serialize(self):
        return {
            'id': self.id,
            'lower': self.lower,
            'upper': self.upper,
        }


class ValueGroupCategorical(ValueGroup):
    """
    Categorical Group: Categorical values can be grouped to one ValueGroupCategorical
    """
    group = models.OneToOneField(to=ValueGroup, on_delete=models.CASCADE, parent_link=True, primary_key=True,
                                 related_name='valuegroupcategorical')


class ValueGroupCategoricalElement(models.Model):
    """
    One value in the value-set of a CategoricalElement in a ValueGroupCategorical.
    """
    value = models.CharField(max_length=255)
    vc_group = models.ForeignKey(to=ValueGroupCategorical, on_delete=models.CASCADE, related_name='elements')

    def __str__(self):
        return self.value


class DimensionElement(models.Model):
    """
    Value-set: One element of a Dimension
    """
    dimension = models.ForeignKey(to=Dimension, on_delete=models.CASCADE, related_name='elements')
    values = models.ManyToManyField(to=ValueGroup)


class DimensionElementElement(models.Model):
    value_group = models.ForeignKey(to=ValueGroup, on_delete=models.CASCADE)
    dimension_element = models.ForeignKey(to=DimensionElement, on_delete=models.CASCADE)
    attribute = models.ForeignKey(to=DimensionAttribute, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('dimension_element', 'attribute',)


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
