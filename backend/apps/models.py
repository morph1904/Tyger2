from django.db import models

# Create your models here.
class App(models.Model):
    name = models.CharField(max_length=255, blank=False)
    address = models.URLField(blank=False)
    insecure_skip_verify = models.BooleanField(default=False)
    websocket = models.BooleanField(default=False)
    transparent = models.BooleanField(default=False)

    def __str__(self):
        return self.name