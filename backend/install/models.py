from django.db import models

# Create your models here.
class Settings(models.Model):
    installstatus = models.BooleanField(default=False)

 #   def __str__(self):
 #       return self.installstatus