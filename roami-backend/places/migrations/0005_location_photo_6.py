# Generated by Django 4.2.1 on 2023-06-19 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('places', '0004_location_followed_list'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='photo_6',
            field=models.ImageField(blank=True, null=True, upload_to='places_images'),
        ),
    ]
