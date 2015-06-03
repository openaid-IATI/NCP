# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ncs', '0008_auto_20150601_1417'),
    ]

    operations = [
        migrations.AddField(
            model_name='display',
            name='added_at',
            field=models.DateTimeField(default=datetime.date(2015, 6, 1), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='display',
            name='owner',
            field=models.ForeignKey(default=1, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
