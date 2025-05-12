from django.urls import path

from . import views

urlpatterns = [
    # path('', home, name='home'),
    # path('subscribe/', views.subscribe, name='subscribe'),
    path('login/', views.login, name="login"),
]