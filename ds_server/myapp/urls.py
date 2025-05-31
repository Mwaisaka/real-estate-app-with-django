from django.urls import path

from . import views

urlpatterns = [
    # path('', home, name='home'),
    path('users/', views.view_users, name='users'),
    path('login/', views.login, name="login"),
]