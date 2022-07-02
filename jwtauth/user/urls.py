from django.contrib import admin
from django.urls import path,include
from .views import ListUsers,AuthTokenview,get_csrf,login_view,logout_view,Facebookview,Googleview



urlpatterns = [
    path('users/', ListUsers.as_view()),
    path('token/',AuthTokenview.as_view()),
    path('getcsrf/',get_csrf),
    path('login/',login_view),
    path('logout/',logout_view),
    path('facebookauth/',Facebookview.as_view()),
    path('googleauth/',Googleview.as_view())
]