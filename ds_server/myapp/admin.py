from django.contrib import admin
from .models import  Subscriber

# Register your models here.
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("username","fullname","email","create_date")

admin.site.register(Subscriber, SubscriberAdmin)
