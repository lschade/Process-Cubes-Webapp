from django.contrib import admin

from process_cube.models import DimensionAttribute, Dimension, ProcessCubeStructure, ValueGroup
# Register your models here.

admin.site.register(ProcessCubeStructure)
admin.site.register(Dimension)
admin.site.register(DimensionAttribute)
admin.site.register(ValueGroup)

