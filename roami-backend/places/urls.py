from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.PlaceCategoriesListView.as_view(), name='categories'),
    path('add/place/', views.PlaceCreateView.as_view(), name='add_place'),
    path('places/', views.PlaceListView.as_view(), name='places'),
    path('user/places/', views.UserPlaceListView.as_view(), name='user_places'),
    path('user/followed/list/', views.UserFollowedList.as_view(), name='user_followed_list'),
    path('place/<int:pk>/update/', views.PlaceUpdateView.as_view(), name='place_update'),
    path('place/followed/<int:place_id>/', views.PlaceFollowedView.as_view(), name="place-followed"),
    path('public/<str:username_slug>/followed/places/', views.PublicUserProfileFollowedList.as_view(),
         name='public-user-followed-list'),
    path('public/<str:username_slug>/places/', views.PublicUserProfilePlacesView.as_view(),
         name='public-user-followed-list'),

    path('place/search/', views.PlaceSearchEngine.as_view(), name='place-search-engine')

]
