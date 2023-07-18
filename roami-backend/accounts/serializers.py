from django.core.validators import FileExtensionValidator
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accounts.models import User, Profile


class ProfileSerializer(serializers.ModelSerializer):
    interests = serializers.SerializerMethodField('get_interests')
    
    def get_interests(self, profile):
        return profile.interests.all().values_list('name', flat=True)
    
    class Meta:
        model = Profile
        fields = ['id', 'profile_picture', 'bio', 'country', 'city', 'paypal', 'instagram', 'youtube', 'tiktok', 'interests']


class UserSerializerWithToken(serializers.ModelSerializer):
    # profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'username', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class GetFullUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    profile_picture = serializers.SerializerMethodField("get_profile_picture")

    def get_profile_picture(self, user):
        return user.profile.profile_picture.url if user.profile.profile_picture else None

    class Meta:
        model = User
        fields = ('id', 'username', 'username_slug', 'first_name', 'last_name', 'email', 'profile', 'profile_picture')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'username_slug', 'first_name', 'last_name', 'email')


class GetFullProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'id', 'profile_picture', 'bio', 'country', 'city', 'paypal', 'instagram', 'youtube', 'tiktok']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_user_data(self, user):
        serializer = GetFullUserSerializer(user)
        return serializer.data

    def validate(self, attrs):
        data = super().validate(attrs)

        # Add custom data to the response
        user = self.user

        data['user'] = self.get_user_data(user)

        return data


class UpdateProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=True)

    # user = GetFullUserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['profile_picture', 'bio', 'country', 'city', 'paypal', 'instagram', 'youtube', 'tiktok']


from django.conf import settings
from rest_framework import serializers
from accounts import google
from accounts.register import register_social_user
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class GoogleSocialAuthSerializer(serializers.Serializer):
    auth_token = serializers.CharField()

    def validate_auth_token(self, auth_token):
        user_data = google.Google.validate(auth_token)
        try:
            user_data['sub']
        except:
            raise serializers.ValidationError(
                'The token is invalid or expired. Please login again.'
            )
        print(user_data['aud'])
        if user_data['aud'] != settings.GOOGLE_CLIENT_ID:

            raise AuthenticationFailed('oops, who are you?')

        user_id = user_data['sub']
        email = user_data['email']
        name = user_data['name']
        provider = 'google'

        user = register_social_user(email=email)
        return get_tokens_for_user(user)

