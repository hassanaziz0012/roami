from django.core.validators import FileExtensionValidator
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accounts.models import User, Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'profile_picture', 'bio', 'country', 'city', 'paypal', 'instagram', 'youtube', 'twitter', 'facebook', 'pinterest']


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
        fields = ['user', 'id', 'profile_picture', 'bio', 'country', 'city', 'paypal', 'instagram', 'youtube', 'twitter', 'facebook', 'pinterest']


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
        fields = ['profile_picture', 'bio', 'country', 'city', 'paypal', 'instagram', 'youtube', 'twitter', 'facebook', 'pinterest']
