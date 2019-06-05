from django.contrib import admin
from .models import Address
# Register your models here.
class AddressesAdmin(admin.ModelAdmin):
    pass
admin.site.register(Address, AddressesAdmin)