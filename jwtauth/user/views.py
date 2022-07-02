from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth import login , authenticate
from .serializers import  FacebookSerializer, UserSerializer,GoogleSerializer
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authtoken import views
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
import json

User = get_user_model()


class ListUsers(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request):
        print(request.user ,request.auth)
        users = User.objects.all()
        data = UserSerializer(users,many=True).data
        res = Response(data=data)
        return Response(data=data)


class AuthTokenview(views.ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token':token.key,
            'email':user.email
        })


def get_csrf(request):
   
    csrf = get_token(request)
    response = JsonResponse({"token":csrf}) 
    
    return response


@require_POST
def login_view(request):
    data = json.loads(request.body)

    username = data['email']
    password = data['password']

    user = authenticate(email=username,password=password)

    if user:
        login(request,user)
        return JsonResponse({"success":"login successfully"})

    return JsonResponse({"error":"wrong credential"},status=404) 

@require_POST
def logout_view(request):
        response = JsonResponse({"success":"logout successfully"})
        response.delete_cookie('csrftoken')
        response.delete_cookie('sessionid')
        return response


class Facebookview(APIView):

    serializer_class =  FacebookSerializer

    def post(self,request):
    
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)


class Googleview(APIView):

    serializer_class =  GoogleSerializer

    def post(self,request):
    
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(dict(serializer.validated_data))
        return Response(dict(serializer.validated_data))
