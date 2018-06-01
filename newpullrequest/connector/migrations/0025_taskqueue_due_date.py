# Generated by Django 2.0.5 on 2018-05-18 06:22


from django.db import migrations, models
from django.utils import timezone


class Migration(migrations.Migration):

    dependencies = [
        ('connector', '0024_taskqueue_remark'),
    ]

    operations = [
        migrations.AddField(
            model_name='taskqueue',
            name='due_date',
            field=models.DateTimeField(blank=True, default=timezone.now, null=True),
        ),
    ]