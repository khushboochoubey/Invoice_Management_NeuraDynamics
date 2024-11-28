# Generated by Django 5.1.3 on 2024-11-27 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0005_alter_invoice_invoice_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='total_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='invoicedetail',
            name='line_total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]