from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import os
import csv
from datetime import datetime, timedelta
from .models import Trip, ItineraryDay

def test_view(request):
    return HttpResponse("Django is working!", content_type="text/plain")

DATA_FILE = 'data.json'

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return []

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=4)

# Load CSV data into memory
HOTELS_CACHE = None
ACTIVITIES_CACHE = None

def load_csv_data():
    global HOTELS_CACHE, ACTIVITIES_CACHE
    
    if HOTELS_CACHE is not None and ACTIVITIES_CACHE is not None:
        return HOTELS_CACHE, ACTIVITIES_CACHE
    
    hotels = {}
    activities = {}
    
    # Load hotels
    if os.path.exists('himachal_hotels_expanded.csv'):
        with open('himachal_hotels_expanded.csv', 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                city = row['city']
                if city not in hotels:
                    hotels[city] = []
                hotels[city].append(row)
    
    # Load activities
    if os.path.exists('himachal_activities_expanded.csv'):
        with open('himachal_activities_expanded.csv', 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                city = row['city']
                if city not in activities:
                    activities[city] = []
                activities[city].append(row)
    
    HOTELS_CACHE = hotels
    ACTIVITIES_CACHE = activities
    return hotels, activities

@api_view(['POST'])
def signup(request):
    data = load_data()
    data.append(request.data)
    save_data(data)
    return Response({'message': 'Signup successful'}, status=201)

@api_view(['POST'])
def login(request):
    data = load_data()
    for user in data:
        if user['email'] == request.data['email'] and user['password'] == request.data['password']:
            return Response({'message': 'Login successful'}, status=200)
    return Response({'message': 'Invalid credentials'}, status=401)

@api_view(['GET'])
def get_destinations(request):
    """Get list of available destinations"""
    hotels, activities = load_csv_data()
    destinations = sorted(list(set(list(hotels.keys()) + list(activities.keys()))))
    return Response({'destinations': destinations})

@api_view(['GET'])
def get_hotels(request):
    """Get hotels for a specific destination"""
    destination = request.query_params.get('destination', '')
    hotels, _ = load_csv_data()
    
    if destination not in hotels:
        return Response({'hotels': []})
    
    hotel_list = hotels[destination]
    return Response({'hotels': hotel_list})

@api_view(['GET'])
def get_activities(request):
    """Get activities for a specific destination"""
    destination = request.query_params.get('destination', '')
    _, activities = load_csv_data()
    
    if destination not in activities:
        return Response({'activities': []})
    
    activity_list = activities[destination]
    return Response({'activities': activity_list})

@api_view(['POST'])
def generate_itinerary(request):
    """Generate an itinerary based on trip details"""
    destination = request.data.get('destination', '')
    start_date_str = request.data.get('start_date', '')
    end_date_str = request.data.get('end_date', '')
    num_travelers = request.data.get('travelers', 1)
    
    try:
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
    except:
        return Response({'error': 'Invalid date format'}, status=400)
    
    # Calculate number of days
    num_days = (end_date - start_date).days + 1
    
    if num_days < 1:
        return Response({'error': 'End date must be after start date'}, status=400)
    
    hotels, activities = load_csv_data()
    
    # Get hotels and activities for destination
    dest_hotels = hotels.get(destination, [])
    dest_activities = activities.get(destination, [])
    
    if not dest_hotels or not dest_activities:
        return Response({'error': f'No data found for {destination}'}, status=404)
    
    # Sort hotels by rating
    sorted_hotels = sorted(dest_hotels, key=lambda x: float(x.get('rating', 0)), reverse=True)[:3]
    
    # Create itinerary
    itinerary = []
    current_date = start_date
    
    for day in range(1, num_days + 1):
        # Distribute activities across days
        daily_activities = []
        activities_per_day = max(2, len(dest_activities) // num_days)
        
        for i in range(activities_per_day):
            idx = (day - 1) * activities_per_day + i
            if idx < len(dest_activities):
                daily_activities.append(dest_activities[idx])
        
        day_itinerary = {
            'day': day,
            'date': current_date.strftime('%Y-%m-%d'),
            'activities': daily_activities,
            'hotels': sorted_hotels,
            'notes': f'Day {day} in {destination}'
        }
        itinerary.append(day_itinerary)
        current_date += timedelta(days=1)
    
    # Create Trip record
    trip = Trip.objects.create(
        destination=destination,
        start_date=start_date,
        end_date=end_date,
        num_travelers=num_travelers
    )
    
    # Create ItineraryDay records
    for day_plan in itinerary:
        ItineraryDay.objects.create(
            trip=trip,
            day_number=day_plan['day'],
            date=day_plan['date'],
            activities=json.dumps(day_plan['activities']),
            hotels=json.dumps(day_plan['hotels']),
            notes=day_plan['notes']
        )
    
    return Response({
        'trip_id': trip.id,
        'destination': destination,
        'start_date': start_date_str,
        'end_date': end_date_str,
        'num_days': num_days,
        'num_travelers': num_travelers,
        'itinerary': itinerary,
        'estimated_budget': {
            'low': num_days * 2000 * num_travelers,
            'medium': num_days * 3500 * num_travelers,
            'high': num_days * 5000 * num_travelers,
        }
    })

@api_view(['GET'])
def get_trip(request, trip_id):
    """Get a specific trip"""
    try:
        trip = Trip.objects.get(id=trip_id)
        days = trip.itinerary_days.all()
        
        itinerary = []
        for day in days:
            itinerary.append({
                'day': day.day_number,
                'date': day.date.strftime('%Y-%m-%d'),
                'activities': json.loads(day.activities),
                'hotels': json.loads(day.hotels) if day.hotels else [],
                'notes': day.notes
            })
        
        return Response({
            'trip_id': trip.id,
            'destination': trip.destination,
            'start_date': trip.start_date.strftime('%Y-%m-%d'),
            'end_date': trip.end_date.strftime('%Y-%m-%d'),
            'num_travelers': trip.num_travelers,
            'itinerary': itinerary
        })
    except Trip.DoesNotExist:
        return Response({'error': 'Trip not found'}, status=404)

@api_view(['GET'])
def list_trips(request):
    """List all trips"""
    trips = Trip.objects.all()
    trip_list = []
    
    for trip in trips:
        trip_list.append({
            'id': trip.id,
            'destination': trip.destination,
            'start_date': trip.start_date.strftime('%Y-%m-%d'),
            'end_date': trip.end_date.strftime('%Y-%m-%d'),
            'num_travelers': trip.num_travelers,
            'created_at': trip.created_at.strftime('%Y-%m-%d %H:%M:%S')
        })
    
    return Response({'trips': trip_list})
