# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from invoices.views import InvoiceViewSet

router = DefaultRouter()
router.register(r'invoices', InvoiceViewSet, basename='invoice')

urlpatterns = [
    path('api/', include(router.urls)),  # Include the router for API endpoints
]

