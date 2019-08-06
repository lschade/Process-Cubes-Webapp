"""pcubes_ws URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from process_cube_view import views as pcv_views
from process_cube import views as pcs_views
from event_log import views as log_views

router = routers.DefaultRouter()
router.register(r'pcv', pcv_views.ProcessCubeViewViewSet)
router.register(r'visible_dimensions', pcv_views.VisibleDimensionViewSet)
router.register(r'mapping', pcv_views.MappingViewSet)

router.register(r'pcs', pcs_views.ProcessCubeViewSet)
router.register(r'dimensions', pcs_views.DimensionViewSet)

router.register(r'log_attributes', log_views.EventLogAttributeViewSet)
router.register(r'eventlogs', log_views.EventLogViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
