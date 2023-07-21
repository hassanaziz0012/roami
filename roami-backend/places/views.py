from django.shortcuts import render, get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import views, status
from rest_framework.decorators import permission_classes
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import FileUploadParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import User
from accounts.permission import IsOwnerOrReadOnly
from places.models import PlaceCategory, Location
from places.serializers import CategorySerializer, PlaceSerializer, UserPlaceSerializer
from urllib.parse import urlparse


# Create your views here.
@permission_classes([AllowAny])
class PlaceCategoriesListView(ListAPIView):
    pagination_class = LimitOffsetPagination
    queryset = PlaceCategory.objects.all()
    serializer_class = CategorySerializer


@permission_classes([AllowAny])
class PlaceListView(ListAPIView):
    pagination_class = LimitOffsetPagination
    queryset = Location.objects.all()
    serializer_class = PlaceSerializer


class UserPlaceListView(ListAPIView):
    serializer_class = PlaceSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            user = self.request.user
        else:
            user_id = self.request.query_params.get('user_id')
            user = get_object_or_404(User, id=user_id)
        return Location.objects.filter(user=user)


# current user followed list
class UserFollowedList(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PlaceSerializer
    queryset = Location.objects.all()
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return Location.objects.filter(followed_list=self.request.user)


class PublicUserProfilePlacesView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PlaceSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        username_slug = self.kwargs.get('username_slug')
        user = get_object_or_404(User, username_slug=username_slug)
        places = Location.objects.filter(user=user)
        return places


class PublicUserProfileFollowedList(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PlaceSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        username_slug = self.kwargs.get('username_slug')
        user = get_object_or_404(User, username_slug=username_slug)
        places = user.place_followed.all()
        return places


@permission_classes([IsAuthenticated])
class PlaceCreateView(views.APIView):
    authentication_classes = [JWTAuthentication]
    serializer_class = PlaceSerializer

    def post(self, request, format=None):
        error_result = {}
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            try:
                category = PlaceCategory.objects.get(name="Drinks")
            except PlaceCategory.DoesNotExist:
                category = PlaceCategory.objects.create(name="Drinks", category_slug="drinks")
                category.save()
                
            new_place = serializer.save(user=self.request.user, category=category)
            new_place.save()
            new_place.tags.add(*request.data.get('tags').split(','))
            output = "Successfully place uploaded"
            content = {'status': True, 'message': output, 'result': serializer.data,
                       }
            return Response(content, status=status.HTTP_200_OK)
        content = {'status': False, 'message': serializer.errors, 'result': error_result}
        return Response(content, status=status.HTTP_200_OK)


class PlaceUpdateView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    lookup_field = 'pk'
    parser_class = (FileUploadParser,)
    serializer_class = PlaceSerializer
    queryset = Location.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        print(data)

        photo_1, photo_2, photo_3, photo_4, photo_5, photo_6 = (
            request.data.get('photo_1'), 
            request.data.get('photo_2'), 
            request.data.get('photo_3'), 
            request.data.get('photo_4'), 
            request.data.get('photo_5'), 
            request.data.get('photo_6')
            )

        if type(photo_1) == str and urlparse(photo_1).path == instance.photo_1.url:
            data['photo_1'] = instance.photo_1
        if type(photo_2) == str and urlparse(photo_2).path == instance.photo_2.url:
            data['photo_2'] = instance.photo_2
        if type(photo_3) == str and urlparse(photo_3).path == instance.photo_3.url:
            data['photo_3'] = instance.photo_3
        if type(photo_4) == str and urlparse(photo_4).path == instance.photo_4.url:
            data['photo_4'] = instance.photo_4
        if type(photo_5) == str and urlparse(photo_5).path == instance.photo_5.url:
            data['photo_5'] = instance.photo_5
        if type(photo_6) == str and urlparse(photo_6).path == instance.photo_6.url:
            data['photo_6'] = instance.photo_6

        serializer = self.serializer_class(instance=instance, data=data,
                                           partial=True, context={'request': request})  # set partial=True to
        # update a data partially
        
        if serializer.is_valid():
            serializer.save()
            instance = self.get_object()
            instance.tags.add(*data.get('tags').split(', '))
            print(instance.tags.all())
            content = {'status': True, 'message': {"Successfully place updated"}, 'result': serializer.data}
            return Response(content, status=status.HTTP_200_OK)
        else:
            content = {'status': False, 'message': serializer.errors, 'result': {}}
            return Response(content, status=status.HTTP_200_OK)
        
    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            # delete_action(instance, instance.id)
            instance.delete()
            content = {'status': True, 'message': {"Successfully place deleted"}}
            return Response(content, status=status.HTTP_200_OK)
        except Location.DoesNotExist:
            content = {'status': False, 'message': {"something went wrong"}}
            return Response(content, status=status.HTTP_200_OK)


class PlaceFollowedView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, place_id, format=None):
        place = get_object_or_404(Location, id=place_id)

        if place.user == request.user:
            resp = {"error": "can not followed own place."}
            return Response(resp, status=status.HTTP_200_OK)

        else:
            if Location.objects.filter(id=place_id, followed_list=request.user):
                place.followed_list.remove(request.user)
                resp = {"status": "unfollowed place", "follow": False}
            else:
                place.followed_list.add(request.user)

                resp = {"status": "followed place", "follow": True}

            return Response(resp, status=status.HTTP_200_OK)


class PlaceSearchEngine(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PlaceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['category__name', 'city', 'tags__name', 'country', 'place_name']
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        queryset = Location.objects.all()
        search_query = self.request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(category__name__icontains=search_query) | \
                       queryset.filter(city__icontains=search_query) | \
                       queryset.filter(tags__name__icontains=search_query) | \
                       queryset.filter(country__icontains=search_query) | \
                       queryset.filter(place_name__icontains=search_query)
        return queryset