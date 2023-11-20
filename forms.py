from django import forms

class Upload(forms.Form):
    name = forms.CharField()
    file = forms.FileField()