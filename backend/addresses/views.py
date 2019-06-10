from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.renderers import JSONRenderer


from .models import Address
from .serializers import AddressSerializer

# Create your views here.
class CountAddresses(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (JSONWebTokenAuthentication, )
    renderer_classes = (JSONRenderer, )
    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        addresscount = {'addresscount': Address.objects.count()}
        
        return Response(addresscount)

class AddressViewset(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
