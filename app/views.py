from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from app.models import AdminMaster
from app.models import Services
from app.models import AddProfessional
from app.models import AddServiceProfessional
from app.models import Register
from app.models import Order
from app.models import Feedback
from django.db.models import Sum
from django.conf import settings
from django.core.mail import send_mail
import random
import json
import re
from django.contrib.staticfiles.finders import find
from .models import JoinUs
# from project.urls import 


# Create your views here.
def openHome(request):
    return render(request, "web/index.html")


def viewDetails(request):
    return render(request, "web/details.html")


def viewBookNow(request):
    return render(request, "web/booknow.html")


def viewAbout(request):
    return render(request, "web/about.html")


def viewWebServices(request):
    return render(request, "web/web_services.html")


def viewContact(request):
    return render(request, "web/contact.html")


def viewLogin(request):
    return render(request, "web/login.html")


def viewRegister(request):
    return render(request, "web/register.html")


def viewUserBooking(request):
    return render(request, "web/user_bookings.html")

def viewjoin(request):
    return render(request, "web/joinus.html")



# admin
def dashboard(request):
    return render(request, "admin/dashboard.html")


def viewAdminMaster(request):
    return render(request, "admin/admin_master.html")


def viewServices(request):
    return render(request, "admin/services.html")

def adminjoin(request):
    return render(request, "admin/projoin.html")


def ViewProfessional(request):
    return render(request, "admin/professional.html")


def viewAdminBookings(request):
    return render(request, "admin/admin_bookings.html")


def viewServiceProfessional(request):
    return render(request, "admin/service_professional.html")


def users(request):
    return render(request, "admin/users.html")


def viewProfessionalBookings(request):
    return render(request, "professional/professional_bookings.html")


def viewAdminLogin(request):
    return render(request, "admin/admin_login.html")


def ViewFeedback(request):
    return render(request, "admin/feedback.html")

def beprofessional(request):
    return render(request, "admin/professionalRequest.html")

def openMyBookings(request):
    if "web_email" in request.session:
        return render(request, "web/my_bookings.html")
    else:
        return render(request, "web/login.html")


# professional
def viewIndex_User(request):
    return render(request, "professional/pro_index.html")


def viewBookingService(request):
    if "web_email" in request.session:
        return render(request, "web/booking_service.html")
    else:
        return render(request, "web/login.html")
    
def ProFeedback(request):
    return render(request, "professional/feedback.html")    


def getSingleItem(request):
    products_json = AddServiceProfessional.objects.filter(
        ab_id=request.POST["txtID"]
    ).values()
    data = list(products_json)
    value = JsonResponse(data, safe=False)
    return value


# logout
from django.http import HttpResponseRedirect
from django.contrib.auth import logout
#Logout
def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/login/')

# admin database
def viewAdd_Admin_Master(request):
    if request.POST["action"] == "add":
        if (
            AdminMaster.objects.filter(
                ad_mobile=request.POST["txtMobileNo"],
                ad_email=request.POST["txtEmail"],
                ad_status=0,
            ).count()
            == 0
        ):
            AdminMaster.objects.create(
                ad_name=request.POST["txtName"],
                ad_mobile=request.POST["txtMobileNo"],
                ad_email=request.POST["txtEmail"],
                ad_password=request.POST["txtPassword"],
                ad_role=request.POST["txtRole"],
            )
        else:
            return HttpResponse("10")

    elif request.POST["action"] == "getData":
        data = AdminMaster.objects.filter(ad_status="0").values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values

    elif request.POST["action"] == "update":
        data = AdminMaster.objects.filter(ad_id=request.POST["id"]).update(
            ad_name=request.POST["txtName1"],
            ad_mobile=request.POST["txtMobileNo1"],
            ad_email=request.POST["txtEmail1"],
        )

    elif request.POST["action"] == "delete":
        data = AdminMaster.objects.filter(ad_id=request.POST["id"]).update(
            ad_status="1"
        )

    return HttpResponse()


#
def viewAddServices(request):
    if request.POST["action"] == "add":
        # if Services.objects.filter(sv_name=request.POST["txtName"]).count() == 0:
        Services.objects.create(
            sv_name=request.POST["txtName"], sv_created_by=request.session["email"]
        )
        # else:
        # return HttpResponse("10")

    elif request.POST["action"] == "getData":
        data = Services.objects.filter(sv_status="0").values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values

    elif request.POST["action"] == "update":
        data = Services.objects.filter(sv_id=request.POST["id"]).update(
            sv_name=request.POST["txtName1"]
        )

    elif request.POST["action"] == "delete":
        data = Services.objects.filter(sv_id=request.POST["id"]).update(sv_status="1")

    return HttpResponse()


def viewAddProfessional(request):
    if request.POST["action"] == "add":
        if (
            AddProfessional.objects.filter(
                ap_mobile=request.POST["txtMobileNo"],
                ap_email=request.POST["txtEmail"],
                ap_status=0,
            ).count()
            == 0
        ):
            AddProfessional.objects.create(
                ap_name=request.POST["txtName"],
                ap_mobile=request.POST["txtMobileNo"],
                ap_email=request.POST["txtEmail"],
                ap_password=request.POST["txtPassword"],
                ap_role=request.POST["txtRole"],
                ap_created_by=request.session["email"],
            )
        else:
            return HttpResponse("10")

    elif request.POST["action"] == "getData":
        data = AddProfessional.objects.filter(ap_status="0").values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values

    elif request.POST["action"] == "update":
        data = AddProfessional.objects.filter(ap_id=request.POST["id"]).update(
            ap_name=request.POST["txtName1"],
            ap_mobile=request.POST["txtMobileNo1"],
            ap_email=request.POST["txtEmail1"],
        )

    elif request.POST["action"] == "delete":
        data = AddProfessional.objects.filter(ap_id=request.POST["id"]).update(
            ap_status="1"
        )

    return HttpResponse()


def getAdminUsers(request):
    data = Register.objects.filter(rg_status="0").values()
    data = list(data)
    values = JsonResponse(data, safe=False)
    return values


def get_login_details(request):
    data = Register.objects.filter().values()
    data = list(data)
    values = JsonResponse(data, safe=False)
    return values


def getAdminServices(request):
    data = Services.objects.filter(sv_status="0").values()
    data = list(data)
    values = JsonResponse(data, safe=False)
    return values


def getAdminBookings(request):
    data = Order.objects.filter().values()
    data = list(data)
    values = JsonResponse(data, safe=False)
    return values


def getProfessionalBookings(request):
    data = Order.objects.filter(or_created_by=request.session["email"]).values()
    data = list(data)
    values = JsonResponse(data, safe=False)
    return values


def get_join_us(request):
    data = JoinUs.objects.filter().values()
    data = list(data)
    values = JsonResponse(data, safe=False)
    return values


def viewServiceProfessionalDetails(request):
    if request.POST["action"] == "getServiceData":
        data = Services.objects.filter(sv_status="0").values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values

    elif request.POST["action"] == "getProfessionalData":
        data = AddProfessional.objects.filter(ap_status="0").values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values

    elif request.POST["action"] == "add":
        data = AddProfessional.objects.filter(
            ap_id=request.POST["selProfessional"]
        ).values()
        data = list(data)
        dictValue = data[0]
        AddServiceProfessional.objects.create(
            ab_name=dictValue["ap_name"],
            ab_email=dictValue["ap_email"],
            ab_mobile=dictValue["ap_mobile"],
            ab_service_name=request.POST["selService"],
            ab_price=request.POST["txtPrice"],
            ab_details=request.POST["txtDetails"],
            ab_image=request.FILES["txtImage"],
            ab_created_by=request.session["email"],
        )

    elif request.POST["action"] == "getData":
        data = AddServiceProfessional.objects.filter(ab_status="0").values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values

    elif request.POST["action"] == "update":
        data = AddServiceProfessional.objects.filter(ab_id=request.POST["id"]).update(
            ab_name=request.POST["txtName1"],
            ab_email=request.POST["txtEmail1"],
            ab_mobile=request.POST["txtMobileNo1"],
            ab_price=request.POST["txtPrice1"],
            ab_details=request.POST["txtDetails1"],
        )

    elif request.POST["action"] == "delete":
        AddServiceProfessional.objects.filter(ab_id=request.POST["id"]).update(
            ab_status="1"
        )
    return HttpResponse()


def updateBookingStatus(request):
    Order.objects.filter(or_id=request.POST["id"]).update(
        or_is_completed=request.POST["selStatus1"]
    )
    return HttpResponse()


def getAdminDashboard(request):
    oredrAmount = Order.objects.filter().aggregate(Sum("or_total_amount"))
    oredrCount = Order.objects.filter().count()
    oredrPending = Order.objects.filter(or_is_completed="Pending").count()
    data = [oredrAmount, {"oredrCount": oredrCount}, {"oredrPending": oredrPending}]
    values = JsonResponse(data, safe=False)
    return values


def getProfessionalDashboard(request):
    oredrAmount = Order.objects.filter(
        or_created_by=request.session["email"]
    ).aggregate(Sum("or_total_amount"))
    oredrCount = Order.objects.filter(or_created_by=request.session["email"]).count()
    oredrPending = Order.objects.filter(
        or_created_by=request.session["email"], or_is_completed="Pending"
    ).count()
    data = [oredrAmount, {"oredrCount": oredrCount}, {"oredrPending": oredrPending}]
    values = JsonResponse(data, safe=False)
    return values


def loginAdminDetails(request):
    if request.POST["selRole"] == "Admin":
        if AdminMaster.objects.filter(
            ad_email=request.POST["txtEmail"],
            ad_password=request.POST["txtPassword"],
            ad_status=0,
        ).count():
            data = AdminMaster.objects.filter(
                ad_email=request.POST["txtEmail"]
            ).values()
            data = list(data)
            dictValue = data[0]
            request.session["email"] = dictValue["ad_email"]
            request.session["role"] = dictValue["ad_role"]
            request.session["name"] = dictValue["ad_name"]
            return HttpResponse(dictValue["ad_role"])
        else:
            return HttpResponse("0")
    elif request.POST["selRole"] == "Professional":
        if AddProfessional.objects.filter(
            ap_email=request.POST["txtEmail"],
            ap_password=request.POST["txtPassword"],
            ap_status=0,
        ).count():
            data = AddProfessional.objects.filter(
                ap_email=request.POST["txtEmail"]
            ).values()
            data = list(data)
            dictValue = data[0]
            request.session["email"] = dictValue["ap_email"]
            request.session["role"] = dictValue["ap_role"]
            request.session["name"] = dictValue["ap_name"]
            return HttpResponse(dictValue["ap_role"])
        else:
            return HttpResponse("0")
  
        


def checkWebLogin(request):
    email = request.POST.get("txtEmail")
    password = request.POST.get("txtPassword")
    
    # Retrieve the user object based on email and password
    try:
        user = Register.objects.get(rg_email=email, rg_password=password)
        request.session["web_email"] = email
        request.session["web_name"] = user.rg_name  # Access the name from the user object
        return HttpResponse("1")
    except Register.DoesNotExist:
        return HttpResponse("10")



def newRegister(request):
    if Register.objects.filter(
        rg_email=request.POST["txtEmail"], rg_mobile=request.POST["txtMobileNo"]
    ).count():
        return HttpResponse("10")
    else:
        lclID = Register.objects.count()
        lclNewID = lclID + 1

        Register.objects.create(
            rg_id=lclNewID,
            rg_name=request.POST["txtName"],
            rg_mobile=request.POST["txtMobileNo"],
            rg_email=request.POST["txtEmail"],
            rg_password=request.POST["txtPassword"],
            rg_address=request.POST["txtAddress"],
        )
    

    return HttpResponse("0")
    
# def profile(request):
#     # Check if the user is authenticated
#     if request.user.is_authenticated:
#         # Assuming `request.user.email` corresponds to the user's email in the Register model
#         try:
#             # Fetch the user details from the Register model based on the email
#             user = Register.objects.get(rg_email=request.user.email)
#             user_name = user.rg_name
#         except Register.DoesNotExist:
#             user_name = 'User'
#     else:
#         user_name = 'User'

#     context = {
#         'user_name': user_name
#     }

#     return render(request, 'index.html', context)


def getHomeDetails(request):
    data = AddServiceProfessional.objects.filter(ab_status="0").values()
    data = list(data)
    values = JsonResponse(data, safe=False)
    return values


def giveRating(request):

    data = Order.objects.filter(or_id=request.POST["id"]).values()
    data = list(data)
    dictValue = data[0]
    Feedback.objects.create(
        fd_rating=request.POST["selRating"],
        fd_feedback=request.POST["txtFeedback"],
        fd_given_to=dictValue["or_created_by"],
        fd_created_by=dictValue["or_ordered_by"],
    )
    return HttpResponse()


def adminGetFeedback(request):
    feedback_data = []

    # Fetch all Feedback objects
    feedbacks = Feedback.objects.all()

    for feedback in feedbacks:
        # Get the Professional and Register objects based on the foreign keys
        professional = AddProfessional.objects.get(ap_email=feedback.fd_given_to)
        register = Register.objects.get(rg_email=feedback.fd_created_by)

        # Construct the feedback data dictionary
        feedback_info = {
            "rating": feedback.fd_rating,
            "feedback": feedback.fd_feedback,
            "fd_given_to": feedback.fd_given_to,
            "fd_created_by": feedback.fd_created_by,
            "ap_name": professional.ap_name,
            "rg_name": register.rg_name,
        }

        # Append the feedback info to the list
        feedback_data.append(feedback_info)

    # Return data as JSON response
    values = JsonResponse(feedback_data, safe=False)
    return values


def saveBooking(request):
    Order.objects.create(
        or_name=request.POST["txtNameBook"],
        or_email=request.POST["txtEmailBook"],
        or_mobile=request.POST["txtNumberBook"],
        or_address=request.POST["txtAddressBook"],
        or_date=request.POST["serviceDate"],
        or_time=request.POST["selTime"],
        or_service_name=request.POST["serviceName"],
        or_total_amount=request.POST["totalAmt"],
        or_ordered_by=request.session["web_email"],
        or_transaction_id=request.POST["transaction_id"],
        or_location=request.POST["txtLocation"],
        or_status="Success",
        or_created_by=request.POST["email"],
    )

    send_mail(
        "Booking Confirmation",
        "Thank you for Booking, Please check my bookings for more information",
        settings.EMAIL_HOST_USER,
        [request.session["web_email"]],
        fail_silently=False,
    )

    return HttpResponse()


def getBookings(request):
    if request.session["role"] == "Admin":
        data = Order.objects.filter().values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values

    else:
        data = Order.objects.filter(or_created_by=request.session["email"]).values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values


def getMyBookings(request):
    data = Order.objects.filter(or_ordered_by=request.session["web_email"]).values()
    data = list(data)
    values = JsonResponse(data, safe=False)
    return values


def get_response(request):
    input_string = request.POST.get("txtMsg", "")

    if not input_string:
        return HttpResponse("Please type something so we can chat and interact... :(")

    # Load JSON data
    file_path = find("bot.json")
    response_data = load_json(file_path)

    split_message = re.split(r"\s+|[,;?!.-]\s*", input_string.lower())
    max_response_score = 0
    best_bot_response = None

    for response in response_data:
        response_score = 0
        required_words = response["required_words"]

        # Calculate required score based on required words
        required_score = sum(1 for word in split_message if word in required_words)

        if required_score == len(required_words):
            # Calculate response score based on user input words
            response_score = sum(
                1 for word in split_message if word in response["user_input"]
            )

            if response_score > max_response_score:
                max_response_score = response_score
                best_bot_response = response["bot_response"]
    print(best_bot_response)
    if best_bot_response == None:
        best_bot_response = ""

    if best_bot_response:
        return HttpResponse(best_bot_response)
    else:
        data = random_string()  # Make sure random_string() returns a valid response
        return HttpResponse(data)


def random_string():
    random_list = [
        "Please try writing something more descriptive.",
        "Oh! It appears you wrote something I don't understand yet",
        "Do you mind trying to rephrase that?",
        "I'm terribly sorry, I didn't quite catch that.",
        "I can't answer that yet, please try asking something else.",
    ]

    list_count = len(random_list)
    random_item = random.randrange(list_count)

    return random_list[random_item]


# Load JSON data
def load_json(file):
    with open(file) as bot_responses:
        print("Heyy!How can I help you?\n")
        return json.load(bot_responses)




def join_us(request):
    if request.method == "POST":
        mobile = request.POST.get("mobile")

       # Create a new JoinUs entry
        JoinUs.objects.create(mobile=mobile)

        return HttpResponse(1)
    else:
        return render(0)