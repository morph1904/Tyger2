from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import action

from .models import Endpoint
from .serializers import EndpointSerializer

from backend import caddy
# Create your views here.
class CountEndpoints(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (JSONWebTokenAuthentication, )
    renderer_classes = (JSONRenderer, )
    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        endpointcount = {'endpointcount': Endpoint.objects.count()}
        
        return Response(endpointcount)

class EndpointViewset(viewsets.ModelViewSet):
    serializer_class = EndpointSerializer
    queryset = Endpoint.objects.all()
    
    def get_queryset(self):

        queryset = Endpoint.objects.all()
        address = self.request.query_params.get('address', None)

        if address is not None:
            #ids = ids.split(',') 
            queryset = queryset.filter(address=address)
        return queryset

