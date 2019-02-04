from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .views import CountApps
urlpatterns = [
    path('count/', CountApps.as_view()),
]