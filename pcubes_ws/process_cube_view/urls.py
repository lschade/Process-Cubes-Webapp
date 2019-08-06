from django.urls import include, path
from rest_framework import routers
from process_cube_view import views

router = routers.DefaultRouter()
router.register(r'pcv', views.ProcessCubeViewViewSet)
router.register(r'dimensions', views.VisibleDimensionViewSet)
router.register(r'mapping', views.MappingViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]