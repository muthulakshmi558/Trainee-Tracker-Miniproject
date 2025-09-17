from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'assigned_to', 'status', 'priority', 'due_date')
    list_filter = ('status', 'priority', 'assigned_to')
    search_fields = ('title', 'description')
    date_hierarchy = 'due_date'