from django.conf import settings
from django.db import models
from django.utils.text import slugify
from taggit.managers import TaggableManager

from accounts.models import User


class PlaceCategory(models.Model):
    name = models.CharField(max_length=255)
    category_slug = models.SlugField()
    category_image = models.ImageField(upload_to='category_images', null=True, blank=True)

    def __str__(self):
        return self.name


# Create your models here.
class Location(models.Model):
    category = models.ForeignKey(PlaceCategory, on_delete=models.CASCADE)
    location_link = models.URLField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    place_name = models.CharField(max_length=255)
    place_name_slug = models.SlugField()
    description = models.CharField(max_length=2000)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    tags = TaggableManager()
    
    photo_1 = models.ImageField(upload_to='places_images')
    photo_2 = models.ImageField(upload_to='place_images', null=True, blank=True)
    photo_3 = models.ImageField(upload_to='places_images', null=True, blank=True)
    photo_4 = models.ImageField(upload_to='places_images', null=True, blank=True)
    photo_5 = models.ImageField(upload_to='places_images', null=True, blank=True)
    photo_6 = models.ImageField(upload_to='places_images', null=True, blank=True)
    
    followed_list = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='place_followed',
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.place_name} has places from {self.city}, {self.country}"

    def save(self, *args, **kwargs):  # new
        if not self.place_name_slug:
            self.place_name_slug = slugify(self.place_name)
        return super().save(*args, **kwargs)
