# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0012_activity_ispreviewed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='backgroundImage',
            field=models.ImageField(default=None, max_length=254, upload_to=b'images'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='activity',
            name='mainImage',
            field=models.ImageField(default=None, max_length=254, upload_to=b'images'),
            preserve_default=True,
        ),
    ]
