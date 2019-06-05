from django.contrib import admin
from .models import App
# Register your models here.
class AppsAdmin(admin.ModelAdmin):
    pass
admin.site.register(App, AppsAdmin)
# Register your models here.
