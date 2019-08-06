from django.urls import include, path
from rest_framework import routers
from process_cube import views

router = routers.DefaultRouter()
router.register(r'pcs', views.ProcessCubeViewSet)
router.register(r'dimensions', views.DimensionViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]