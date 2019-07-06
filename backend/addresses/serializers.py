from rest_framework import serializers
from .models import Address
from apps.models import App
from dns.models import DNS
from endpoints.models import Endpoint
from backend import caddy

class AddressSerializer(serializers.ModelSerializer):
    app = serializers.SlugRelatedField(slug_field='name', queryset=App.objects.all())
    provider = serializers.SlugRelatedField(slug_field='provider_name', queryset=DNS.objects.all())
    
    class Meta:
        model = Address
        fields = ('id', 'address', 'tls', 'staging', 'app', 'provider', 'dns_challenge', 'endpoints')

    def update(self, instance, validated_data):
        instance.address = validated_data.get('address', instance.address)
        instance.tls = validated_data.get('tls', instance.tls)
        instance.staging = validated_data.get('staging', instance.staging)
        instance.app = validated_data.get('app', instance.app)
        instance.provider = validated_data.get('provider', instance.provider)
        instance.dns_challenge = validated_data.get('dns_challenge', instance.dns_challenge)

        instance.save()
        caddy.build_caddyfile(self)
        

        return instance

    def create(self, validated_data):
        Address.objects.create(**validated_data)
        caddy.build_caddyfile(self)
        return Address(**validated_data)