from django.contrib import admin
from .models import Hotel

@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ('nom', 'adresse', 'prix_nuit', 'devise', 'date_creation')
    search_fields = ('nom', 'adresse')