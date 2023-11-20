from os import name
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, HttpResponseBadRequest
from .forms import Upload
from Encrypt.models import Upload1

def handle_uploaded_file(f):
    with open('media'+ f.name,'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

def Index(request):
    context = {} 
    if request.POST: 
        form = Upload(request.POST, request.FILES) 
        if form.is_valid(): 
            handle_uploaded_file(request.FILES["file"]) 
            has = hash(name)
            return HttpResponse(has)
    else: 
        form = Upload() 
        context['form'] =form
        return render(request,"Index.html",context)


def download_file(request, file_id):
    uploaded_file = Upload1.objects.get(pk = file_id)
    response = HttpResponseBadRequest(uploaded_file.file,content_type = 'application/force-download')
    response['Content-Disposition'] = f'attachment; filename = "{uploaded_file.file.name}"'

def Login(request):
    return render(request,'LoginPage.html')



#def LoginPage(request):
 #   return render(request,'LoginPage.html')