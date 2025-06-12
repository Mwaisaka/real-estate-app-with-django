from django.urls import path

from . import views

urlpatterns = [
    # path('', home, name='home'),
    path('users/', views.view_users, name='users'),
    path('login/', views.login, name="login"),
    path('tenant_payment_status/', views.tenant_payment_status, name="tenant_payment_status"),
    path('tenants/', views.view_tenants, name='tenants'),
    path('tenants_all_details/', views.view_tenants_full_details, name='tenants_all_details'),
    path('delete_tenant/<int:id>', views.delete_tenant, name='delete_tenant'),
    path("add_tenant/", views.add_tenant, name="add_tenant"),
    path('edit_tenant/<int:id>/', views.edit_tenant, name='edit_tenant'),
    path("add_payment/", views.add_payment, name="add_payment"),
    path('payments/', views.view_rent_payments, name='payments'),
    path('delete_payment/<int:id>', views.delete_payment, name='delete_payment'),
    path('edit_payment/<int:id>/', views.edit_payment, name='edit_payment'),
]