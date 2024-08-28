from django.db import models
from datetime import datetime
from django.core.exceptions import ValidationError


# Create your models here.
class AdminMaster(models.Model):
    ad_id = models.AutoField(primary_key=True, unique=True)
    ad_name = models.CharField(max_length=100)
    ad_mobile = models.CharField(max_length=100)
    ad_email = models.CharField(max_length=100)
    ad_password = models.CharField(max_length=100)
    ad_role = models.CharField(max_length=100)
    ad_status = models.IntegerField(default=0)
    ad_created_by = models.CharField(max_length=100, default="")


class Services(models.Model):
    sv_id = models.AutoField(primary_key=True, unique=True)
    sv_name = models.CharField(max_length=100)
    sv_status = models.IntegerField(default=0)
    sv_created_by = models.CharField(max_length=100, default="")


class AddProfessional(models.Model):
    ap_id = models.AutoField(primary_key=True, unique=True)
    ap_name = models.CharField(max_length=100)
    ap_mobile = models.CharField(max_length=100)
    ap_email = models.CharField(max_length=100)
    ap_password = models.CharField(max_length=100)
    ap_role = models.CharField(max_length=100)
    ap_status = models.IntegerField(default=0)
    ap_created_by = models.CharField(max_length=100, default="")


class AddServiceProfessional(models.Model):
    ab_id = models.AutoField(primary_key=True, unique=True)
    ab_name = models.CharField(max_length=100)
    ab_email = models.CharField(max_length=100, default="")
    ab_mobile = models.CharField(max_length=100, default="")
    ab_service_name = models.CharField(max_length=100, default="")
    ab_price = models.CharField(max_length=100)
    ab_details = models.CharField(max_length=100)
    ab_image = models.ImageField(upload_to="app/static/media/professional/")
    ab_status = models.IntegerField(default=0)
    ab_created_by = models.CharField(max_length=100, default="")


class Register(models.Model):
    rg_id = models.AutoField(primary_key=True, unique=True)
    rg_name = models.CharField(max_length=100)
    rg_mobile = models.CharField(max_length=100)
    rg_email = models.CharField(max_length=100)
    rg_password = models.CharField(max_length=100)
    rg_address = models.CharField(max_length=100, default="")
    rg_status = models.CharField(max_length=100, default="0")


class Order(models.Model):
    or_id = models.AutoField(primary_key=True, unique=True)
    or_name = models.CharField(max_length=100)
    or_email = models.CharField(max_length=100, default="")
    or_mobile = models.CharField(max_length=100, default="")
    or_service_name = models.CharField(max_length=100)
    or_total_amount = models.CharField(max_length=100)
    or_address = models.CharField(max_length=100)
    or_date = models.CharField(max_length=100, default="")
    or_time = models.CharField(max_length=100, default="")
    or_ordered_by = models.CharField(max_length=100)
    or_transaction_id = models.CharField(max_length=100)
    or_location = models.TextField(default="")
    or_status = models.CharField(max_length=100, default="Pending")
    or_is_completed = models.CharField(max_length=100, default="Pending")
    or_created_by = models.CharField(max_length=100)


class Feedback(models.Model):
    fd_id = models.AutoField(primary_key=True, unique=True)
    fd_rating = models.CharField(max_length=100)
    fd_feedback = models.CharField(max_length=100)
    fd_given_to = models.CharField(max_length=100)
    fd_status = models.IntegerField(default=0)
    fd_created_by = models.CharField(max_length=100, default="")
    
class JoinUs(models.Model):
    mobile = models.CharField(max_length=15, unique=True)  # Adjust the length as needed
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.mobile   
    