from django.urls import include, path
from rest_framework import routers
from event_log import views

router = routers.DefaultRouter()
router.register(r'log_attributes', views.EventLogAttributeViewSet)
router.register(r'eventlogs', views.EventLogViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]