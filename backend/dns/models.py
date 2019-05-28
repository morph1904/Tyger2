from django.db import models

class DNS(models.Model):
    provider_name = models.CharField(max_length=200, blank=False, unique=True)
    caddy_name = models.CharField(max_length=200, blank=True)

    def get_absolute_url(self):
        return reverse('dns-detail', kwargs={'name': self.provider_name})

    def __str__(self):
        return self.provider_name


class EVariables(models.Model):
    variable = models.CharField(max_length=200, blank=False, unique=False)
    dns_provider = models.ForeignKey(DNS, on_delete=models.CASCADE)
    value = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.variable