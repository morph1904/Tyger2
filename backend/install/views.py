from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.renderers import JSONRenderer

from .models import Settings

from .serializers import SettingsSerializer

# Create your views here.
class status(APIView):
    renderer_classes = (JSONRenderer, )
    def get(self, request, format=None):
        """
        Return the install status.
        """
        settingsRecord = ''

        try:
            settingsRecord = Settings.objects.get(pk=1).installstatus
        except Settings.DoesNotExist:
            settingsRecord = "notInstalled"

        installstatus = {'installstatus': settingsRecord}

        
        return Response(installstatus)

class Install(TemplateView):
    template_name = "install.html"