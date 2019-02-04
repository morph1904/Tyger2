from rest_framework import serializers
from .models import Address
from apps.models import App

class AddressSerializer(serializers.ModelSerializer):
    app = serializers.SlugRelatedField(slug_field='url', queryset=App.objects.all())
    class Meta:
        model = Address
        fields = ('id', 'address', 'tls', 'staging', 'app')
    