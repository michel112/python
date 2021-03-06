# Generated by Django 2.0.5 on 2018-05-14 04:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0020_auto_20180513_1559'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='linkedinuser',
            name='pin',
        ),
        migrations.AddField(
            model_name='bottask',
            name='extra_info',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='bottask',
            name='status',
            field=models.CharField(choices=[('Queued', 'Queued'), ('Running', 'Running'), ('Pin Required', 'Pin Required'), ('Pin Checking', 'Pin Checking'), ('Pin Invalid', 'Pin Invalid'), ('Error', 'Error'), ('Done', 'Done')], default='Queued', max_length=10),
        ),
        migrations.AlterField(
            model_name='linkedinuser',
            name='status',
            field=models.BooleanField(default=False),
        ),
    ]
