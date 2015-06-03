# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ncs', '0002_auto_20150309_2211'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2015, 3, 9, 22, 25, 56, 502778), auto_now_add=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='collection',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2015, 3, 9, 22, 25, 56, 502810), auto_now=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='playlist',
            name='creator',
            field=models.ForeignKey(default=1, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
