from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.renderers import JSONRenderer
from rest_framework.settings import api_settings

from rest_framework_csv import renderers as r

from addresses.models import Address
from apps.models import App
from dns.models import DNS
from endpoints.models import Endpoint

class ExportViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    renderer_classes = (r.CSVRenderer,) + tuple(api_settings.DEFAULT_RENDERER_CLASSESS)
    def get_queryset(self):
        return