from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .views import GetStats
urlpatterns = [
    path('/', GetStats.as_view()),
]