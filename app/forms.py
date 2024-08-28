# forms.py
from django import forms
from .models import JoinUs

class JoinUsForm(forms.ModelForm):
    class Meta:
        model = JoinUs
        fields = ['mobile']
        widgets = {
            'mobile': forms.TextInput(attrs={'placeholder': 'Enter your mobile number'}),
        }

    def clean_mobile(self):
        mobile = self.cleaned_data.get('mobile')
        # Example validation: Ensure mobile number contains only digits
        if not mobile.isdigit():
            raise forms.ValidationError("Mobile number must contain only digits.")
        return mobile
