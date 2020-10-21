from django.shortcuts import render
from django.core import serializers
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import action
# Create your views here.

from addresses.models import Address
from apps.models import App
from endpoints.models import Endpoint

class ExportAll(viewsets.ViewSet):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (JSONWebTokenAuthentication, BasicAuthentication)
    renderer_classes = (JSONRenderer, )
    def list(self, request, format=None):
        """
        Return all records and relationships in JSON format
        """
        Addresses = Address.objects.values('id', 'address', 'tls', 'staging', 'app__name')
        Apps = App.objects.values()
        Endpoints = Endpoint.objects.values('id', 'endpoint', 'address__address', 'proxy_to__name')

        #AllAddresses = serializers.serialize('json', Addresses)
        #AllApps = serializers.serialize('json', Apps)
        #AllEndpoints = serializers.serialize('json', Endpoints)
        #print(AllAddresses)
        #print(AllApps)
        #print(AllEndpoints)
        data = {
            'addresses': Addresses,
            'apps': Apps, 
            'endpoints': Endpoints 
        }

        return Response(data)