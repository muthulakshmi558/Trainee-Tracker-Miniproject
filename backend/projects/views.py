from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    
    if not user.is_authenticated:
        # Proper REST response for unauthenticated access
        raise NotAuthenticated("Authentication credentials were not provided.")
    
    queryset = Project.objects.all()

    if not user.is_staff:
        queryset = queryset.filter(assigned_to=user)

    status = self.request.query_params.get('status')
    priority = self.request.query_params.get('priority')
    if status:
        queryset = queryset.filter(status=status)
    if priority:
        queryset = queryset.filter(priority=priority)

    return queryset


    @action(detail=False, methods=['get'])
    def reports(self, request):
        if not request.user.is_staff:
            return Response({'error': 'Only trainers can view reports'}, status=403)
            
        reports = Project.objects.values('status').annotate(count=Count('status'))
        return Response(reports)
