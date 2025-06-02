from django.contrib import admin
from .models import Subscriber, Tenant, RentPayment

# Register your models here.


class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("username","fullname","email","create_date")


admin.site.register(Subscriber, SubscriberAdmin)


class TenantAdmin(admin.ModelAdmin):
    list_display = ("tenant_name", "room_number", "rent_amount", "join_date")
    search_fields = ('tenant_name', 'room_number')
    
    
admin.site.register(Tenant, TenantAdmin)


@admin.register(RentPayment)
class RentPaymentAdmin(admin.ModelAdmin):
    list_display = ('tenant', 'year', 'month', 'amount_due', 'amount_paid', 'date_paid')
    list_filter = ('year', 'month', 'tenant')
    search_fields = ('tenant__name',)