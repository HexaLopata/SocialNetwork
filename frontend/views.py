from django.shortcuts import render

# Create your views here.
def index(request, pk = -1):
    return render(request, 'frontend/index.html')