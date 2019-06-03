from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .views import status, Install
urlpatterns = [
    path('status/', status.as_view()),
    path('', Install.as_view())
]