from django.urls import path
from .views import (signup, login, test_view, get_destinations, get_hotels, 
                    get_activities, generate_itinerary, get_trip, list_trips)

urlpatterns = [
    path('', test_view),
    path('signup/', signup),
    path('login/', login),
    path('destinations/', get_destinations),
    path('hotels/', get_hotels),
    path('activities/', get_activities),
    path('generate-itinerary/', generate_itinerary),
    path('trips/', list_trips),
    path('trips/<int:trip_id>/', get_trip),
]
