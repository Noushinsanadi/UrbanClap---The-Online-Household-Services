# Generated by Django 4.2.3 on 2023-07-16 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_order_or_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='or_is_completed',
            field=models.CharField(default='Pending', max_length=100),
        ),
    ]
