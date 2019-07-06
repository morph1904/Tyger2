from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers, serializers, viewsets

from .views import CountEndpoints

urlpatterns = [
    path('count/', CountEndpoints.as_view()),
    #path('list/', EndpointsList.as_view())
]