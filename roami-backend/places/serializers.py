from rest_framework import serializers
from taggit.serializers import TaggitSerializer, TagListSerializerField

from accounts.models import User
from accounts.serializers import GetFullUserSerializer
from .models import Location
from places.models import PlaceCategory


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceCategory
        fields = ['id', 'name', 'category_slug']


class PlaceSerializer(TaggitSerializer, serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    category = serializers.SlugRelatedField(slug_field='category_slug', queryset=PlaceCategory.objects.all())
    place_name_slug = serializers.SerializerMethodField()
    tags = TagListSerializerField()
    user = GetFullUserSerializer(read_only=True, default=serializers.CurrentUserDefault())
    
    # photo_1 = serializers.SerializerMethodField('get_photo_1')

    # def get_photo_1(self, place):
        # return place.photo_1.url

    class Meta:
        model = Location
        fields = ['id', 'category', 'user', 'location_link', 'place_name', 'place_name_slug', 'description', 'country',
                  'city',
                  'tags', 'photo_1', 'photo_2', 'photo_3', 'photo_4', 'photo_5', 'photo_6']

    def get_place_name_slug(self, obj):
        return obj.place_name_slug


class UserPlaceSerializer(TaggitSerializer, serializers.ModelSerializer):
    place_followed = PlaceSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'place_followed']


