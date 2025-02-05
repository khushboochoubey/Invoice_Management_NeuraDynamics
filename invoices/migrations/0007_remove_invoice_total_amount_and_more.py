# Generated by Django 5.1.3 on 2024-11-28 03:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0006_alter_invoice_total_amount_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoice',
            name='total_amount',
        ),
        migrations.AlterField(
            model_name='invoicedetail',
            name='line_total',
            field=models.DecimalField(decimal_places=2, editable=False, max_digits=10),
        ),
        migrations.AlterField(
            model_name='invoicedetail',
            name='quantity',
            field=models.PositiveIntegerField(),
        ),
    ]
