from rest_framework.authtoken.models import Token

from accounts.models import User
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed


def register_social_user(email):
    filtered_user_by_email = User.objects.filter(email=email)

    if filtered_user_by_email.exists():
        new_user = User.objects.get(email=email)

        registered_user = User.objects.get(email=email)
        registered_user.check_password(settings.SOCIAL_SECRET)

        return registered_user

    else:
        user = {
            'username': email.split("@")[0], 'email': email,
            'password': settings.SOCIAL_SECRET
        }
        user = User.objects.create_user(**user)
        user.is_active = True
        user.save()
        new_user = User.objects.get(email=email)
        new_user.check_password(settings.SOCIAL_SECRET)
        
        return new_user
