from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import os

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
