from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse

from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Subscriber


# Create your views here.
@csrf_exempt  # Exempting CSRF for API requests (can be handled better for production)
def login(request):
  if request.method == 'POST':
    try:
      # Parse JSON data from the request body
      data=json.loads(request.body)
      username = data.get("username")
      password = data.get("password")
      
      # Validate required fields
      if not all([username, password]):
          return JsonResponse({"error": "Username and password are required"}, status=400)
      
      # Check if the user exists
      # subscriber_exists = Subscriber.objects.filter(username=username).exists()
      # if not subscriber_exists:
      #     return JsonResponse({"error": "Invalid username or password"}, status=401)
        
      # Authenticate user
      # subscriber = authenticate(username=username, password=password)
      subscriber = authenticate(request, username=username, password=password)
      
      if subscriber is not None:
        # If using session-based authentication
        # django_login(request, subscriber)
        
        # Generate JWT token
        refresh = RefreshToken.for_user(subscriber)
                
        # Sucessfully authenticated
        return JsonResponse({
          'message': "Login successful",
          'token': str(refresh.access_token),
          'refresh_token': str(refresh),
          'subscriber': {
            'id': subscriber.id,
            'username': subscriber.username,
            'fullname': subscriber.fullname,
          }
        }, status=200)
      else:
        # Incorrect username or password
        return JsonResponse({"error": "Invalid username or password"}, status=401)
    except json.JSONDecodeError:
      return JsonResponse({"error":"Invalid JSOn payload"},status=400)
    except Exception as e:
      return JsonResponse({"error":str(e)},status=500)
  else:
    return JsonResponse({"error":"Post request required"},status=405)
  
@api_view(['GET'])
@csrf_exempt
def view_users(request):
    subscriber = Subscriber.objects.all().values()
    return JsonResponse(list(subscriber), safe=False)