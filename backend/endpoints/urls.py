from django.urls import path, include
from rest_framework import routers, serializers, viewsets

from .views import CountEndpoints

urlpatterns = [
    path('count/', CountEndpoints.as_view()),
]