from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,TokenVerifyView
)

from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework.authtoken import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')), # used when api is for web browsing not treated as an api for another server
    path('',include('user.urls')),
    
    path('auth/token',TokenObtainPairView.as_view()),
    path('auth/token/refresh',TokenRefreshView.as_view()),
    path('auth/token/verify',TokenVerifyView.as_view()),

]
