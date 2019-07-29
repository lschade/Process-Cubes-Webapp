from django.urls import path
from import_xes.views import FileUploadView

urlpatterns = [
    path('upload/', FileUploadView.as_view())
]