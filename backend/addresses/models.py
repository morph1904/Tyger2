from django.db import models

# Create your models here.
class Address(models.Model):
    name = models.CharField(max_length=255, blank=False)
    address = models.URLField(blank=False)
    tls = models.BooleanField(default=True)
    staging = models.BooleanField(default=False)

    def __str__(self):
        return self.name