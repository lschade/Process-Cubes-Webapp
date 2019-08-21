from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views

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
router.register(r'dimension_attribute', pcs_views.DimensionAttributeViewSet)
router.register(r'vgroup_date', pcs_views.ValueGroupDateViewSet)
router.register(r'vgroup_number', pcs_views.ValueGroupNumberViewSet)
router.register(r'vgroup_categorical', pcs_views.ValueGroupCategoricalViewSet)
router.register(r'vgroup_categorical_element', pcs_views.ValueGroupCategoricalElementViewSet)
router.register(r'vgroup', pcs_views.ValueGroupViewSet)
router.register(r'dimension_element', pcs_views.DimensionElementViewSet)

router.register(r'log_attributes', log_views.EventLogAttributeViewSet)
router.register(r'eventlogs', log_views.EventLogViewSet)


urlpatterns = [
    path("", TemplateView.as_view(template_name="pages/home.html"), name="home"),
    path(
        "about/", TemplateView.as_view(template_name="pages/about.html"), name="about"
    ),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
    path("users/", include("pcubes_ws.users.urls", namespace="users")),
    path("accounts/", include("allauth.urls")),
    # Your stuff: custom urls includes go here
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
