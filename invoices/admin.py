from django.contrib import admin
from .models import Invoice, InvoiceDetail

class InvoiceDetailInline(admin.TabularInline):  # or admin.StackedInline
    model = InvoiceDetail
    extra = 1  # Number of empty forms shown by default

class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['invoice_number', 'customer_name', 'date']
    inlines = [InvoiceDetailInline]

admin.site.register(Invoice, InvoiceAdmin)
