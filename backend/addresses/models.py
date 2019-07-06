from django.db import models
from apps.models import App
from dns.models import DNS
# Create your models here.
class Address(models.Model):
    address = models.CharField(max_length=255, blank=False, unique=True)
    tls = models.BooleanField(default=True)
    staging = models.BooleanField(default=False)
    app = models.ForeignKey(App, on_delete=models.CASCADE)
    provider = models.ForeignKey(DNS, on_delete=models.SET_NULL,blank=True, null=True)
    dns_challenge = models.BooleanField(default=False)
    endpoints - models.One
    def __str__(self):
        return self.address