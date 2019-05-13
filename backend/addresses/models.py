from django.db import models
from apps.models import App
# Create your models here.
class Address(models.Model):
    address = models.CharField(max_length=255, blank=False, unique=True)
    tls = models.BooleanField(default=True)
    staging = models.BooleanField(default=False)
    app = models.ForeignKey(App, on_delete=models.CASCADE)
    def __str__(self):
        return self.address