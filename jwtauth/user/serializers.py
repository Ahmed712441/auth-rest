from rest_framework import serializers
from django.contrib.auth import get_user_model
from .facebook import Facebook
from .google import Google
from .register import registerSocailUser
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password= serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = '__all__'

class FacebookSerializer(serializers.Serializer):

    access_token = serializers.CharField()


    def validate_access_token(self,access_token):
       
        try:
            user_data = Facebook.validate(access_token)
            email = user_data['email']
            name = user_data['name']
            provider = 'facebook'
            return registerSocailUser(
                provider=provider,
                email=email,
                name=name
            )

        except Exception as e:
            raise serializers.ValidationError(
                'The token  is invalid or expired. Please login again.'
            )


class GoogleSerializer(serializers.Serializer):

    access_token = serializers.CharField()


    def validate_access_token(self,access_token):
       
        try:
            user_data = Google.validate(access_token)
            print(user_data)
            email = user_data['email']
            name = user_data['name']
            provider = 'google'
            return registerSocailUser(
                provider=provider,
                email=email,
                name=name
            )

        except Exception as e:
            print(e)
            raise serializers.ValidationError(
                'The token  is invalid or expired. Please login again.'
            )