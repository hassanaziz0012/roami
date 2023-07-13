from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
from accounts.utils import get_username_unique_slug


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("email is required")
        email = self.normalize_email(email)
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        """creates new superuser with details """

        user = self.create_user(email, username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100, blank=False)
    username = models.CharField(max_length=100, unique=True, db_index=True, validators=[UnicodeUsernameValidator()])
    username_slug = models.SlugField(max_length=200, db_index=True, blank=True, null=True)

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def save(self, *args, **kwargs):
        if not self.username_slug and self.pk:
            slug_str = f'{self.username}'
            self.username_slug = get_username_unique_slug(self, slug_str, User.objects)

        super().save(*args, **kwargs)

    @property
    def full_name(self):
        full_name = f'{self.first_name} {self.last_name}'
        return full_name.strip()


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(
        upload_to='profile_pictures/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    interests = models.ManyToManyField('accounts.Interest', blank=True)
    followers = models.ManyToManyField(User, related_name='following', blank=True)
    country = models.CharField(blank=True, max_length=100)
    city = models.CharField(blank=True, max_length=100)
    paypal = models.URLField(blank=True, null=True, max_length=100)
    facebook = models.URLField(blank=True, null=True, max_length=100)
    instagram = models.URLField(blank=True, null=True, max_length=100)
    youtube = models.URLField(blank=True, null=True, max_length=100)
    twitter = models.URLField(blank=True, null=True, max_length=100)
    pinterest = models.URLField(blank=True, null=True, max_length=100)

    def __str__(self):
        return f"Profile - User: {self.user.username} - Name: {self.user.get_full_name()}"

    @property
    def followers_count(self):
        return self.followers.count()

    @property
    def following_count(self):
        return self.following.count()
    

class Interest(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)

    @classmethod
    def create_default_interests(cls):
        default_interests = [
            'Animals', 'Cooking', 'Food', 'Movies', 'Travel', 'Outdoors', 
            'Video games', 'Board games', 'Reading', 'Museums', 'Anime', 
            'Architecture', 'Art', 'Aviation', 'Backpacking', 'Building things', 
            'Camping', 'Card Games', 'Cars', 'Celebrities', 'Comedy', 'Crafting', 
            'Cultural heritage', 'Design', 'Fashion', 'Gardening', 'Hair', 'Hiking', 
            'Home improvement', 'Kpop', 'Live music', 'Live sports', 'Makeup', 
            'Photography', 'Playing music', 'Podcasts', 'Pop culture', 'Puzzles', 
            'Self-care', 'Shopping', 'Singing', 'Social activism', 'Sustainability', 
            'TV', 'Technology', 'Theater', 'Walking', 'Wine', 'Writing', 'Yoga', 
            'Baseball', 'Cycling', 'Tai chi', 'Weight lifting', 'Ultimate frisbee', 
            'Figure skating', 'Shooting sports', 'Basketball', 'Sumo wrestling', 
            'Handball', 'Adrenaline sports', 'American football', 'Archery', 
            'Badminton', 'Basque pelota', 'Billiards', 'Bobsledding', 'Bocce ball', 
            'Bowling', 'Boxing', 'Bridge', 'Canoeing', 'Charreria', 'Cheerleading', 
            'Chess', 'Climbing', 'Cricket', 'Curling', 'Dance', 'Darts', 'Diving', 
            'Dodgeball', 'Equestrian sports', 'Fantasy sports', 'Fencing', 
            'Field hockey', 'Fishing', 'Golf', 'Gymnastics', 'Hockey', 'Horse racing', 
            'Judo', 'Karate', 'Kayaking', 'Kickboxing', 'Kung fu', 'Lacrosse', 'Luge', 
            'Motor sports', 'Netball', 'Padel', 'Pentathlon', 'Pickleball', 'Poker', 
            'Polo', 'Racquetball', 'Rodeo', 'Roller derby', 'Roller skating', 'Rowing', 
            'Rugby', 'Running', 'Sailing', 'Skateboarding', 'Skiing', 'Snowboarding', 
            'Soccer', 'Squash', 'Surfing', 'Swimming', 'Table tennis', 'Taekwondo', 
            'Tennis', 'Track & field', 'Volleyball', 'Water polo', 'Wrestling'
            ]
        objs = []
        for interest in default_interests:
            try:
                i = Interest.objects.get(name=interest)
            except Interest.DoesNotExist:
                i = Interest(name=interest, slug=interest.lower())
                objs.append(i)
        Interest.objects.bulk_create(objs)

    def __str__(self) -> str:
        return self.name
    
    def __repr__(self) -> str:
        return f"<Interest: {self.name}>"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
