from django.urls import path
from . import views
from .views import ProfileUpdateAPIView

urlpatterns = [
    path('account/create/', views.RegisterView.as_view()),
    path('account/login/', views.LoginView.as_view(), name='login'),
    path('account/logout/', views.LogoutView.as_view(), name='logout'),
    path('account/profile/', views.GetProfileView.as_view(), name="profile"),
    path('account/profile/<int:user_id>/', views.GetProfileView.as_view(), name="profile"),
    path('account/user/update/<int:user_id>/', views.UserUpdateAPIView.as_view(), name='user-update'),
    path('account/profile/update/<int:user_id>/', ProfileUpdateAPIView.as_view(), name='profile-update'),
    path('account/google-sign-up/', views.GoogleSocialAuthView.as_view(), name="google-sign-up"),
    path('account/email-exists/', views.EmailExistsView.as_view(), name="email-exists"),
]