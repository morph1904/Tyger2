from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.renderers import JSONRenderer

from .models import DNS
from .serializers import DNSSerializer



class DNSViewset(viewsets.ModelViewSet):
    queryset = DNS.objects.all()
    serializer_class = DNSSerializer
