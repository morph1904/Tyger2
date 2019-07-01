from django.db import models
from apps.models import App
from addresses.models import Address
# Create your models here.
class Endpoint(models.Model):
    endpoint = models.CharField(max_length=255, blank=False, unique=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    proxy_to = models.ForeignKey(App, on_delete=models.SET_NULL,blank=True, null=True)
    
    def __str__(self):
        return self.endpoint