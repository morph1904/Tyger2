from rest_framework import serializers
from .models import DNS

class DNSSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = DNS
        fields = ('id','provider_name', 'caddy_name')
    