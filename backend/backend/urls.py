"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import psutil
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from django.contrib.auth.models import User

from apps.views import CountApps
from apps.views import AppsViewset

from install.views import status

from addresses.views import CountAddresses
from addresses.views import AddressViewset
from addresses.views import ReloadProxy
from dns.views import DNSViewset

from . import caddy
# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

        # ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# For auth with JWT
class RestrictedView(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (JSONWebTokenAuthentication, )

    def get(self, request):
        data = {
            'id': request.user.id,
            'username': request.user.username,
            'token': str(request.auth)
        }
        return Response(data)

class StatsView(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (JSONWebTokenAuthentication, )

    def get(self, request):
        memory = psutil.virtual_memory()
        data = {
            'mem_total': memory.total,
            'mem_avail': memory.available,
            'mem_percent': memory.percent,
            'mem_used': memory.used,
            'mem_free': memory.free,
            'cpu_percent': psutil.cpu_percent(interval=None),
        }
        print(memory.total)
        return Response(data)
# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()

# This was used for unauthorized access before implementing JWT:
router.register(r'users', UserViewSet)
router.register(r'addresses', AddressViewset)
router.register(r'apps', AppsViewset)
router.register(r'dns', DNSViewset)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-verify/', verify_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
    path('stats/', StatsView().as_view()),
    path('apps/', include('apps.urls')),
    path('addresses/', include('addresses.urls')),
    path('install/', include('install.urls')),
    path('', include(router.urls)),
    path('generate/', ReloadProxy.as_view())
]
