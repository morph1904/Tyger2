from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .views import GetCaddyLogs, GetHostLogs, GetuWSGILogs

urlpatterns = [
    path('caddy/', GetCaddyLogs.as_view()),
    path('uwsgi/', GetuWSGILogs.as_view()),
    path('address/<address>/', GetHostLogs.as_view())

]