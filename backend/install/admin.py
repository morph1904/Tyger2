from django.contrib import admin
from .models import Settings

# Register your models here.
class SettingsAdmin(admin.ModelAdmin):
    pass
admin.site.register(Settings, SettingsAdmin)