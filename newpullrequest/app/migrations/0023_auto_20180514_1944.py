# Generated by Django 2.0.5 on 2018-05-14 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0022_auto_20180514_0447'),
    ]

    operations = [
        migrations.AlterField(
            model_name='linkedinuser',
            name='email',
            field=models.CharField(max_length=254, unique=True),
        ),
    ]
