from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .views import CountAddresses
urlpatterns = [
    path('count/', CountAddresses.as_view()),
]