from allauth.account import app_settings
from allauth.account.utils import complete_signup
from allauth.account.views import SignupView
from django.shortcuts import render
from django.contrib.auth import logout as django_logout
from drf_yasg.utils import swagger_auto_schema
# Create your views here.
from rest_framework import status, permissions, views
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import UpdateAPIView, get_object_or_404, ListAPIView, GenericAPIView
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.models import User, Profile, Interest
from accounts.permission import IsOwnerOrReadOnly
from accounts.serializers import CustomTokenObtainPairSerializer, GetFullUserSerializer, UpdateProfileSerializer, \
    UserSerializerWithToken, ProfileSerializer, GetFullProfileSerializer, GoogleSocialAuthSerializer


class RegisterView(APIView):
    # authentication_classes = [AllowAny]
    permission_classes = [AllowAny]
    serializer_class = UserSerializerWithToken

    @swagger_auto_schema(
        request_body=UserSerializerWithToken,
        # responses={
        #     201: 'User registration successful',
        #     400: 'Bad request',
        # }
    )
    def post(self, request, *args, **kwargs):
        print('post')
        error_result = {}

        serializer = UserSerializerWithToken(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            print(access_token)

            output = "Successfully accounts created."
            content = {'status': True, 'message': output}
            return Response(content, status=status.HTTP_200_OK)
        content = {'status': False, 'message': serializer.errors, 'result': error_result}
        return Response(content, status=status.HTTP_200_OK)


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
        except AuthenticationFailed as e:
            # Handle the authentication failed exception
            email = self.request.data.get('email')
            user = User.objects.filter(email=email)
            if not user.exists():
                error_message = 'User does not exist.'
            else:
                error_message = 'Invalid email or password.'
            return self.custom_error_response(error_message)

        return self.process_response(response)

    def process_response(self, response):
        res = response.data

        if response.status_code == 200 and 'access' in res:
            email = self.request.data.get('email')
            user = User.objects.filter(email=email).first()

            if user:
                if not user.check_password(self.request.data.get('password')):
                    error_message = 'Invalid email or password.'
                    return self.custom_error_response(error_message)

                serializer = GetFullUserSerializer(user, context={'request': self.request})
                res['user'] = serializer.data
            else:
                error_message = 'User does not exist.'
                return self.custom_error_response(error_message)

        return Response(res)

    def custom_error_response(self, error_message):
        return Response({
            'status': False,
            'message': error_message,
            'result': {}
        }, status=status.HTTP_200_OK)
    

class EmailExistsView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        return Response({'exists': User.objects.filter(email=email).exists()})


class GetProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id', None)
        if user_id:
            user = get_object_or_404(User, id=user_id)
        else:
            user = get_object_or_404(User, id=request.user.id)
            
        serializer = GetFullUserSerializer(user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        django_logout(request)
        return Response(status=204)


class UserUpdateAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsOwnerOrReadOnly]

    def patch(self, request, *args, **kwargs):
        username = request.data.get('username')
        profile_picture = request.data.get('profile_picture')
        user = get_object_or_404(User, id=request.user.id)

        if username and username != '':
            user.username = username
            user.save(update_fields=['username'])

        if profile_picture and profile_picture != 'null':
            profile = get_object_or_404(Profile, user=user)
            profile.profile_picture = profile_picture
            profile.save(update_fields=['profile_picture'])

        serializer = GetFullUserSerializer(user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileUpdateAPIView(UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsOwnerOrReadOnly]
    lookup_field = 'user_id'
    serializer_class = UpdateProfileSerializer
    queryset = Profile.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = UpdateProfileSerializer(
            instance=instance, 
            data=request.data,
            partial=True, # set partial=True to update a data partially
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            interests = request.data.get('interests')
            interest_objs = Interest.objects.filter(name__in=interests)
            print(interests, interest_objs)
            instance.interests.clear()
            instance.interests.add(*interest_objs)
            result = serializer.data
            result['interests'] = list(instance.interests.all().values_list('name', flat=True))
            output = "Successfully account updated"
            content1 = {'success': [output]}
            content = {'status': True, 'message': content1, 'result': result}
            return Response(content, status=status.HTTP_200_OK)
        else:
            content = {'status': False, 'message': serializer.errors, 'result': {}}
            return Response(content, status=status.HTTP_200_OK)
        

class GoogleSocialAuthView(APIView):
    serializer_class = GoogleSocialAuthSerializer
    permission_classes = []

    def post(self, request):
        """
        POST with "auth_token"
        Send an idtoken as from google to get user information
        """

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = ((serializer.validated_data)['auth_token'])
        return Response(data, status=status.HTTP_200_OK)
