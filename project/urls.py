
from django.contrib import admin
from django.urls import path
from app import views


urlpatterns = [
    # web
    path("", views.openHome),
    path("index/", views.openHome),
    path("details/", views.viewDetails),
    path("booknow/", views.viewBookNow),
    path("about/", views.viewAbout),
    path("web_services/", views.viewWebServices),
    path("contact/", views.viewContact),
    path("login/", views.viewLogin),
    path("register/", views.viewRegister),
    path("user_bookings/", views.viewUserBooking),
    path("joinus/",views.viewjoin),
       
    # path("get_Login_details/",views.get_login_details),
    
    # admin
    path("dashboard/", views.dashboard),
    path("users/", views.users),
    path("admin_master/", views.viewAdminMaster),
    path("professional/", views.ViewProfessional),
    path("feedback/", views.ViewFeedback),
    path("admin_bookings/", views.viewAdminBookings),
    path("service_professional/", views.viewServiceProfessional),
    path("service_professional_details/", views.viewServiceProfessionalDetails),
    path("admin_login/", views.viewAdminLogin),
    path("admin_login_details/", views.loginAdminDetails, name="login"),
    path("adminjoin/",views.adminjoin),
    
    # admin database
    path("addAdmin_Master/", views.viewAdd_Admin_Master),
    path("services/", views.viewServices),
    path("add_services/", views.viewAddServices),
    path("get_admin_users/", views.getAdminUsers),
    path("get_admin_bookings/", views.getAdminBookings),
    path("addProfessional/", views.viewAddProfessional),
    path("add_register/", views.newRegister, name="home"),
    path("check_web_login/", views.checkWebLogin, name="web_login"),
    path("get_join/",views.join_us,name="get_join"),
    # professional
    path("pro_index/", views.viewIndex_User),
    path("professional_bookings/", views.viewProfessionalBookings),
    path("get_professional_bookings/", views.getProfessionalBookings),
    path("booking_service/", views.viewBookingService),
    path("get_single_item/", views.getSingleItem, name="home"),
    path("get_home_details/", views.getHomeDetails, name="web_login"),
    path("web_booking/", views.saveBooking, name="web_login"),
    path("get_bookings/", views.getBookings, name="login"),
    path("my_bookings/", views.openMyBookings, name="login"),
    path("get_my_bookings/", views.getMyBookings, name="login"),
    path("update_booking_status/", views.updateBookingStatus, name="login"),
    path("get_admin_dashboard/", views.getAdminDashboard, name=""),
    path("get_professional_dashboard/", views.getProfessionalDashboard, name=""),
    path("web_give_rating/", views.giveRating, name=""),
    path("admin_get_feedback/", views.adminGetFeedback, name=""),
    path("start_chat/", views.get_response),
     path('logout/', views.user_logout, name='logout'),
    path("get_join_us/",views.get_join_us,name="get_join_us"),
    # path("ProFeedback/", views.ProFeedback),
    
     
   
]
