# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-04-27 20:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20180428_0622'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='visitcount',
            field=models.IntegerField(),
        ),
    ]