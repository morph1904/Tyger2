from rest_framework import serializers
from .models import Address
from apps.models import App
from dns.models import DNS

class AddressSerializer(serializers.ModelSerializer):
    app = serializers.SlugRelatedField(slug_field='url', queryset=App.objects.all())
    provider = serializers.SlugRelatedField(slug_field='provider_name', queryset=DNS.objects.all())
    class Meta:
        model = Address
        fields = ('id', 'address', 'tls', 'staging', 'app', 'provider', 'dns_challenge')
    