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
import calendar
from django.utils.timezone import localtime, now


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
            'join_date' : tenant.join_date.strftime('%d-%m-%Y'),
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
      total_overdue_amount = 0.00
      
      # current = tenant.join_date.replace(day=1)
      # end = today.replace(day=1)
      
      current = tenant.join_date.replace(day=1)
      end = today.replace(day=1)
      
      expected_months = []
      while current < end:
        expected_months.append((current.year, current.month))
        current += relativedelta(months=1)
        year = current.year
        month = current.month
      
      # while current < end:
      #   year = current.year
      #   month = current.month
        
        try:
          payment = RentPayment.objects.get(tenant=tenant, year=year, month=month)
          if payment.amount_paid < payment.amount_due: 
            total_overdue_months += 1
            total_overdue_amount += float(payment.amount_due - payment.amount_paid)
        except RentPayment.DoesNotExist:
          total_overdue_months +=1
          total_overdue_amount += float(tenant.rent_amount)
        
        current += relativedelta(months=1)
      
      # total_rent_due = len(expected_months) * float(tenant.rent_amount)
      data.append({
        'id': tenant.id,
        'tenant_name': tenant.tenant_name,
        'room_number': tenant.room_number,
        'rent_amount': format(tenant.rent_amount, ',.2f'),
        'join_date': tenant.join_date.strftime('%d-%m-%Y'),
        'total_overdue_months': total_overdue_months,
        'total_overdue_amount': format(total_overdue_amount, ',.2f'),
      })
      
    return JsonResponse(data, safe=False)
  
@api_view(['DELETE'])
@csrf_exempt
def delete_tenant(request,id):
  if request.method == "DELETE":
    try:
      tenant = get_object_or_404(Tenant, id=id)
      tenant.delete()
      return JsonResponse({"message": "Tenant deleted successfully"}, status=200)
    except Tenant.DoesNotExist:
      return JsonResponse({"error": "Tenant does not exist"}, status=404)
  else:
    return JsonResponse({"erro": "Delete request required"}, status=405)

@api_view(['POST'])
@csrf_exempt
def add_tenant(request):
  if request.method == "POST":
    try:
      data=json.loads(request.body)
      
      #Validate required fields
      required_fields = ['tenant_name', 'room_number', 'rent_amount', 'join_date']
      for field in required_fields:
        if field not in data:
          return JsonResponse({"error" :  f"{field} is required."}, status=400)
      
      #CreateTenant
      tenant = Tenant.objects.create(
        tenant_name=data['tenant_name'],
        room_number=data['room_number'],
        rent_amount=data['rent_amount'],
        join_date=datetime.strptime(data['join_date'], "%Y-%m-%d").date(),
      )
      
      return JsonResponse({"message": "Tenant added successfully.",
                  "tenant": {
                    "id": tenant.id,
                    "tenant_name": tenant.tenant_name,
                    "room_number": tenant.room_number,
                    "rent_amount": tenant.rent_amount,
                    "join_date": tenant.join_date.strftime('%d-%m-%Y'),
                  }
                  }, status=201)
      
    except json.JSONDecodeError:
      return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
      return JsonResponse({"error": str(e)}, status=500)

@api_view(['PUT'])
@csrf_exempt
def edit_tenant(request, id):
    try:
        tenant = get_object_or_404(Tenant, id=id)
        data = json.loads(request.body)

        # Update tenant details
        if 'tenant_name' in data:
            tenant.tenant_name = data['tenant_name']
        if 'room_number' in data:
            tenant.room_number = data['room_number']
        if 'rent_amount' in data:
            tenant.rent_amount = data['rent_amount']
        if 'join_date' in data:
            tenant.join_date = datetime.strptime(data['join_date'], "%Y-%m-%d").date()
        tenant.save()

        # Update rent payments if provided
        updated_payments = []
        if 'rent_payments' in data and isinstance(data['rent_payments'], list):
            for payment_data in data['rent_payments']:
                year = payment_data.get('year')
                month = payment_data.get('month')
                amount_due = payment_data.get('amount_due')
                amount_paid = payment_data.get('amount_paid')
                date_paid = payment_data.get('date_paid', None)

                if not all([year, month, amount_due is not None, amount_paid is not None]):
                    return JsonResponse({
                        "error": "Each rent_payment must include year, month, amount_due, and amount_paid."
                    }, status=400)

                rent_payment, created = RentPayment.objects.get_or_create(
                    tenant=tenant,
                    year=year,
                    month=month,
                    defaults={
                        'amount_due': amount_due,
                        'amount_paid': amount_paid,
                        'date_paid': datetime.strptime(date_paid, '%Y-%m-%d').date() if date_paid else None
                    }
                )

                if not created:
                    rent_payment.amount_due = amount_due
                    rent_payment.amount_paid = amount_paid
                    rent_payment.date_paid = (
                        datetime.strptime(date_paid, '%Y-%m-%d').date() if date_paid else None
                    )
                    rent_payment.save()

                updated_payments.append({
                    "year": rent_payment.year,
                    "month": rent_payment.month,
                    "amount_due": float(rent_payment.amount_due),
                    "amount_paid": float(rent_payment.amount_paid),
                    "date_paid": rent_payment.date_paid.strftime('%Y-%m-%d') if rent_payment.date_paid else None
                })

        return JsonResponse({
            "message": "Tenant and rent payments updated successfully.",
            "tenant": {
                "id": tenant.id,
                "tenant_name": tenant.tenant_name,
                "room_number": tenant.room_number,
                "rent_amount": float(tenant.rent_amount),
                "join_date": tenant.join_date.strftime('%Y-%m-%d')
            },
            "updated_rent_payments": updated_payments
        }, status=200)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(['POST'])
@csrf_exempt
def add_payment(request):
   if request.method == "POST":
     try:
       data = json.loads(request.body)
       
       tenant_id=data.get('tenant')
       year=int(data.get('year'))
       month=int(data.get('month'))
      #  amount_due=float(data.get('amount_due'))
       amount_paid=float(data.get('amount_paid'))
       date_paid=data.get('date_paid')
       
       #Validate tenant exists
       try:
         tenant=Tenant.objects.get(id=tenant_id)
       except json.JSONDecodeError:
         return JsonResponse({"error":"Tenant not found"}, status=400)
       
       #Check for duplicate month and year
       if RentPayment.objects.filter(tenant=tenant, year=year, month=month).exists():
              return JsonResponse({"error": "Payment for this month already exists."},
                  status=400)
         
        # Create the rent payment manually
      
       amount_due = tenant.rent_amount
       rent_payment = RentPayment.objects.create(
              tenant=tenant,
              year=year,
              month=month,
              amount_due=amount_due,
              amount_paid=amount_paid,
              date_paid=date_paid if date_paid else None
          )
       
       # Get month name
       month_name = calendar.month_name[month]
        
       return JsonResponse({
                    "message": "Rent payment added successfully.",
                    "payment_id": rent_payment.id,
                    "month": month_name,
                    "year": year
                }, status=201)
     except json.JSONDecodeError:
      return JsonResponse({"error": "Invalid JSON"}, status=400)
     except Exception as e:
      return JsonResponse({"error": str(e)}, status=500)

@api_view(['GET'])
@csrf_exempt
def view_rent_payments(request):
    payments = RentPayment.objects.select_related('tenant').all()
    result = []
    for payment in payments:
        result.append({
            "id": payment.id,
            "tenant_id": payment.tenant.id,
            "tenant_name": payment.tenant.tenant_name,
            "year": payment.year,
            "month": calendar.month_name[payment.month][:3], 
            "amount_due": payment.amount_due,
            "amount_paid": payment.amount_paid,
            "date_paid": payment.date_paid.strftime('%d-%m-%Y'),
        })

    return JsonResponse(result, safe=False)

@api_view(['DELETE'])
@csrf_exempt
def delete_payment(request,id):
  if request.method == "DELETE":
    try:
      payment = get_object_or_404(RentPayment, id=id)
      payment.delete()
      return JsonResponse({"message": "Payment deleted successfully"}, status=200)
    except RentPayment.DoesNotExist:
      return JsonResponse({"error": "Payment does not exist"}, status=404)
  else:
    return JsonResponse({"erro": "Delete request required"}, status=405)
  
@api_view(['PUT'])
@csrf_exempt
def edit_payment(request, id):
  if request.method == "PUT":
    try:
      data = json.loads(request.body)

      #Fetch the repayment entry
      rent_payment = get_object_or_404(RentPayment, id=id)

      #Optional fields to update
      tenant_id = data.get("tenant")
      if tenant_id:
        try:
          tenant=Tenant.objects.get(id=tenant_id)
          rent_payment.tenant=tenant
        except Tenant.DoesNotExist:
          return JsonResponse({"error": "Tenant not found"}, 404)
      if "year" in data:
        rent_payment.year=data['year']
      if "month" in data:
        rent_payment.month=data["month"]
      if "amount_paid" in data:
        rent_payment.amount_paid=float(data['amount_paid'])
      if "date_paid" in data:
        rent_payment.date_paid=datetime.strptime(data['date_paid'], '%Y-%m-%d').date()
        
      rent_payment.save()
      
      return JsonResponse({
                "message": "Rent payment updated successfully.",
                "updated_payment": {
                    "id": rent_payment.id,
                    "tenant_id": rent_payment.tenant.id,
                    "tenant_name": rent_payment.tenant.tenant_name,
                    "year": rent_payment.year,
                    "month": rent_payment.month,
                    "amount_paid": rent_payment.amount_paid,
                    "date_paid": rent_payment.date_paid.strftime('%Y-%m-%d') if rent_payment.date_paid else None
                }
            }, status=200)
    except json.JSONDecodeError:
      return JsonResponse({"error": "Invalid JSON payload"}, status=400)
    except Exception as e:
      return JsonResponse({"error": str(e)}, status = 500)
  else:
    return JsonResponse({"error": "PUT request is required"}, status=405)

@api_view(['GET'])
@csrf_exempt
def tenant_statement(request, id):
 
  try:
    tenant = get_object_or_404(Tenant, id=id)
    today = date.today()
    now_time = localtime(now()) 
    
    # Calculate overdue months & total_due   
    total_due =0.0 
    total_paid = 0.0
    total_overdue_months = 0
    
    join = tenant.join_date.replace(day=1)
    current = today.replace(day=1)
    
    expected_months = []
    while join < current:
          expected_months.append((join.year, join.month))
          join += relativedelta(months=1)
    
    payment_map = {
          (p.year, p.month): p
          for p in RentPayment.objects.filter(tenant=tenant)
      }
    
    payment_records = []
  
    for year, month in expected_months:
      payment_obj = payment_map.get((year, month), None)
      if isinstance(payment_obj, RentPayment):
          due = float(payment_obj.amount_due)
          paid = float(payment_obj.amount_paid)
          date_paid = payment_obj.date_paid.strftime('%d-%m-%Y') if payment_obj.date_paid else None
      else:
          due = float(tenant.rent_amount)
          paid = 0.0
          date_paid = None
      
      if paid<due:
        total_overdue_months +=1
        total_due += due - paid
      
      total_paid +=paid
      
      payment_records.append({
        'year' : year,
        'month': calendar.month_name[month][:3],
        'amount_due': format(due, ',.2f'),
        'amount_paid': format(paid, ',.2f'),
        'balance': format(due - paid, ',.2f'),
        'date_paid': date_paid,
      })
      
      total_rent_due = len(expected_months) * float(tenant.rent_amount)
      statement = {
            'generated_on': now_time.strftime('%d-%m-%Y %H:%M:%S'),
            'tenant': {
                'id': tenant.id,
                'tenant_name': tenant.tenant_name,
                'room_number': tenant.room_number,
                'rent_amount': format(tenant.rent_amount, ',.2f'),
                'join_date': tenant.join_date.strftime('%d-%m-%Y'),
            },
            'payment_history': payment_records,
            'summary': {
                'total_due': format(total_rent_due, ',.2f'),
                'total_paid': format(total_paid, ',.2f'),
                'balance': format(total_rent_due - total_paid, ',.2f'),
                'total_overdue_months': total_overdue_months,
            }
        }      
    return JsonResponse(statement, status = 200)
  except Exception as e:
    return JsonResponse({'error': str(e)}, status=500)
      
    