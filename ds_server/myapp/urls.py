from django.urls import path

from . import views

urlpatterns = [
    # path('', home, name='home'),
    path('users/', views.view_users, name='users'),
    path('login/', views.login, name="login"),
    path('tenant_payment_status/', views.tenant_payment_status, name="tenant_payment_status"),
    path('tenants/', views.view_tenants, name='tenants'),
    path('tenants_all_details/', views.view_tenants_full_details, name='tenants_all_details'),
]