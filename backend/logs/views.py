from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import action
from addresses.models import Address
import fileinput
import re
import os

def readfile(file, type):
    filecontent = {}
    index = 0

    for line in fileinput.input(file):
        index = index+1
        #if line != "\n": #don't read newlines
        filecontent[index] = line2dict(line, type)
    fileinput.close()
    #print('Filecontent:' + filecontent)
    return filecontent

#gets a line of string from Log and convert it into Dict Object
def line2dict(line, type):
    if type == 'caddy':
        parts = [
            r'(?P<date>.*?)',   
            r'(?P<time>.*?)',      
            r'(?P<type>.*?)',
            r'(?P<message>.*?)',
        ]
        pattern = re.compile(r'\s+'.join(parts)+r'\s*\Z')
        
        m = pattern.match(line)
        res = m.groupdict()
        return res
    elif type == 'caddyhost':
        parts = [
            r'(?P<ip>[(\d\.)]+)',
            r'(?P<seperator> - -)',
            r'\[(?P<date>.*?):(.*?)\]',      
            r'\"(?P<method>\w+)',
            r'HTTP/(?P<http_version>.*?)\"',
            r'(?P<status_code>\d+)',
            r'(?P<response_size>\d+)',
        ]
        pattern = re.compile(r'(?P<ip>[(\d\.)]+) - - \[(?P<date>.*?):(.*?)\] \"(?P<method>\w+) (?P<request_path>.*?) HTTP/(?P<http_version>.*?)\" (?P<status_code>\d+) (?P<response_size>\d+)')
        m = pattern.match(line)
        res = m.groupdict()
        return res
    elif type =='uwsgi':
        pattern = re.compile(r'(^.*)')
        m = pattern.match(line)
        newres = m.group()
        return newres

    else:
        pattern = re.compile(r'\s+'.join(parts)+r'\s*\Z')
        m = pattern.match(line)
        res = m.groupdict()
        return res

#to get jSon of entire Log
#returns JSON object
def toJson(file, type):
    #get dict object for each entry
    entries = readfile(file, type)

    return entries

class GetCaddyLogs(APIView):
    #permission_classes = (IsAuthenticated, )
    #authentication_classes = (JSONWebTokenAuthentication, )
    #renderer_classes = (JSONRenderer, )
    def get(self, request, format=None):
        root_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),'data')
        log_path = os.path.join(root_path,'logs')
        log_file = os.path.join(log_path, 'caddy.log')
        """
        Return a JSON version of the Caddy log
        """
        parsed_log = toJson(log_file,'caddy')
        return Response(parsed_log)

class GetHostLogs(APIView):
    #permission_classes = (IsAuthenticated, )
    #authentication_classes = (JSONWebTokenAuthentication, )
    #renderer_classes = (JSONRenderer, )
    def get(self, request, address, ):
        address = self.kwargs['address']
        record = Address.objects.get(pk=address)
        logname = record.app.name
        root_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),'data')
        log_path = os.path.join(root_path,logname)
        log_file = os.path.join(log_path, logname +'.log')
        """
        Return a JSON version of the Caddy log
        """
        parsed_log = toJson(log_file,'caddyhost')
        return Response(parsed_log)

class GetuWSGILogs(APIView):
    #permission_classes = (IsAuthenticated, )
    #authentication_classes = (JSONWebTokenAuthentication, )
    #renderer_classes = (JSONRenderer, )
    def get(self, request,):
        root_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),'data')
        log_path = os.path.join(root_path,'logs')
        log_file = os.path.join(log_path, 'uwsgi.log')
        """
        Return a JSON version of the Caddy log
        """
        parsed_log = toJson(log_file,'uwsgi')
        return Response(parsed_log)