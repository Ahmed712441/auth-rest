from tokenize import Token
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

RAND_PASSWORD = 'dsakjdklsajdklsajdkljsklajdklsjad'

User = get_user_model()

def registerSocailUser(email,name,provider):

    try:
        user = User.objects.get(email=email)
    except:
        user = User.objects.create_user(email, name, password=RAND_PASSWORD,authprovider=User.LOGIN_PROVIDERS[provider],is_active=True)
        
    token, created = Token.objects.get_or_create(user=user)
    return token.key
    