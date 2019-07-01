from rest_framework import serializers
from .models import Endpoint
from apps.models import App
from addresses.models import Address

from backend import caddy

class EndpointSerializer(serializers.ModelSerializer):
    proxy_to = serializers.SlugRelatedField(slug_field='name', queryset=App.objects.all())
    address = serializers.SlugRelatedField(slug_field='address', queryset=Address.objects.all())
    class Meta:
        model = Endpoint
        fields = ('id', 'endpoint', 'address', 'proxy_to')

    def update(self, instance, validated_data):
        instance.endpoint = validated_data.get('endpoint', instance.endpoint)
        instance.address = validated_data.get('address', instance.address)
        instance.proxy_to = validated_data.get('proxy_to', instance.proxy_to)      

        instance.save()
        caddy.build_caddyfile(self)
        

        return instance

    def create(self, validated_data):
        Endpoint.objects.create(**validated_data)
        caddy.build_caddyfile(self)
        return Endpoint(**validated_data)