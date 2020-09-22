from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .views import ExportAll
urlpatterns = [
    path('process/', ExportAll.as_view({'get': 'list'})),
]