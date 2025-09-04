from django.shortcuts import render

# Create your views here.
from .models import Task
from .serializers import TaskSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
import requests

from .models import Task
from .serializers import TaskSerializer
from .services.analyzer import TaskAnalyzerService

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by("-created_at")
    serializer_class = TaskSerializer

    @action(detail=False, methods=["get"], url_path="stats")
    def stats(self, request):
        svc = TaskAnalyzerService()
        try:
            return Response(svc.get_stats(), status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response({"detail": "Analyzer no disponible", "error": str(e)}, status=503)
        except Exception as e:
            return Response({"detail": "Error al procesar stats", "error": str(e)}, status=500)