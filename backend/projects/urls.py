from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)

def api_home(request):
    return JsonResponse({"message": "Welcome to Trainee Tracker API. Use /api/projects/ to fetch projects."})
    
urlpatterns = [
    path('', api_home, name='api-home'),      
    path('', include(router.urls)),          

]
