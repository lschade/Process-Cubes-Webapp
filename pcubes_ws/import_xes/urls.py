from django.urls import path
from import_xes.views import FileUploadView

urlpatterns = [
    path('', FileUploadView.as_view())
]