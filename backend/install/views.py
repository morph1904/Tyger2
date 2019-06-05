from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.renderers import JSONRenderer

from .models import Settings

from .serializers import SettingsSerializer

from django.core.management import call_command
from django import db

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

    def get(self, request, *args, **kwargs):
        #settingsRecord = 'install_settings' in db.connection.introspection.table_names()
        #if(settingsRecord):
        #return render(request, 'installerror.html')
            #alert  = '<div class="alert alert-danger" role="alert">WARNING! The system is already installed. Completeing this form will destroy your system and rebuild a new environment! Proceed with caution!</div>'
       # else:
        return render(request, self.template_name)
    
    def post(self, request, *args, **kwargs):
        data = request.POST.copy()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        serverip = data.get('serverip')
        
        call_command('migrate')
        call_command('loaddata', 'dns')
        call_command('loaddata', 'variables')
        print(serverip)
        setup = Settings(installstatus=True, serverip=serverip)
        setup.save()
        user = User.objects.create_superuser(username, email, password)
        return render(request, 'installsuccess.html', {'serverip': serverip})