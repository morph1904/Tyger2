from rest_framework import serializers
from addresses.models import Address
from apps.models import App
from dns.models import DNS
from endpoints.models import Endpoint


class ExportSerializer(serializers.ModelSerializer):
    class Meta:
        model = App
        fields = ('id', 'name', 'url', 'insecure_skip_verify', 'websocket', 'transparent')

    def update(self, instance, validated_data):

        instance.name = validated_data.get('name', instance.name)
        instance.url = validated_data.get('url', instance.url)
        instance.insecure_skip_verify = validated_data.get('insecure_skip_verify', instance.insecure_skip_verify)
        instance.websocket = validated_data.get('websocket', instance.websocket)
        instance.transparent = validated_data.get('transparent', instance.transparent)
        instance.save()
        
        caddy.build_caddyfile(self)

        return instance

    def create(self, validated_data):
        App.objects.create(**validated_data)
        caddy.build_caddyfile(self)
        return App(**validated_data)