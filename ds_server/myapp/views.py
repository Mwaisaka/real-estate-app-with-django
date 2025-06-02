from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime, date
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Subscriber, Tenant, RentPayment
from dateutil.relativedelta import relativedelta


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
      
      subscriber = authenticate(request, username=username, password=password)
      
      if subscriber is not None:
               
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
  

@api_view(['GET'])
@csrf_exempt
def tenant_payment_status(request):
    today = date.today()
    tenants = Tenant.objects.all()
    tenant_statuses = []
  
    for tenant in tenants:
        status = {
          'tenant': {
            'id' : tenant.id,
            'tenant_name' : tenant.tenant_name,
            'room_number' : tenant.room_number,
            'rent_amount' : str(tenant.rent_amount),
            'join_date' : tenant.join_date.strftime('%Y-%m-%d'),
            },
          'unpaid_months': [],
          'total_unpaid_months': 0,
          'total_overdue_amount': 0.00
        }

        current = tenant.join_date.replace(day=1)
        end = today.replace(day=1)
        
        while current<end:
          year = current.year
          month = current.month
          overdue =0.00
          try:
            payment = RentPayment.objects.get(tenant=tenant, year=year, month=month)
            if payment.amount_paid < payment.amount_due:
              overdue = float(payment.amount_due - payment.amount_paid)
              status['unpaid_months'].append({'year': year, 'month': month})
              status['total_unpaid_months'] += 1
              status['total_overdue_amount'] += overdue
          except RentPayment.DoesNotExist:
             # Entire rent amount is overdue
            overdue = float(tenant.rent_amount)
            status['unpaid_months'].append({'year': year, 'month': month})
            status['total_unpaid_months'] += 1
            status['total_overdue_amount'] += overdue
          
          current += relativedelta(months=1)
        
        # Round overdue amount to 2 decimal places
        status['total_overdue_amount'] = round(status['total_overdue_amount'], 2)
        tenant_statuses.append(status)
               
    return JsonResponse({'tenant_statuses': tenant_statuses}, status=200)


@api_view(['GET'])
@csrf_exempt
def view_tenants(request):
    tenants = Tenant.objects.all().values()
    return JsonResponse(list(tenants), safe=False)


@api_view(['GET'])
@csrf_exempt
def view_tenants_full_details(request):
    today = date.today()
    tenants = Tenant.objects.all()
    data = []
    
    for tenant in tenants:
      total_overdue_months = 0
      total_overdue_amount = 0
      
      current = tenant.join_date.replace(day=1)
      end = today.replace(day=1)
      
      while current < end:
        year = current.year
        month = current.month
        
        try:
          payment = RentPayment.objects.get(tenant=tenant, year=year, month=month)
          if payment.amount_paid < payment.amount_due: 
            total_overdue_months += 1
            total_overdue_amount += float(payment.amount_due - payment.amount_paid)
        except RentPayment.DoesNotExist:
          total_overdue_months +=1
          total_overdue_amount += float(tenant.rent_amount)
        
        current += relativedelta(months=1)
      
      data.append({
        'id': tenant.id,
        'tenant_name': tenant.tenant_name,
        'room_number': tenant.room_number,
        'rent_amount': str(tenant.rent_amount),
        'join_date': tenant.join_date.strftime('%Y-%m-%d'),
        'total_overdue_months': total_overdue_months,
        'total_overdue_amount': round(total_overdue_amount, 2),
      })
      
    return JsonResponse(data, safe=False)