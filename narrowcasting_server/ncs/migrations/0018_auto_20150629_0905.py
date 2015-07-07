# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0017_auto_20150619_1549'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slide',
            name='backgroundImage',
            field=models.ImageField(default=None, max_length=254, null=True, upload_to=b'images'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='slide',
            name='mainImage',
            field=models.ImageField(default=None, max_length=254, null=True, upload_to=b'images'),
            preserve_default=True,
        ),
    ]
