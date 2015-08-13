# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0024_auto_20150813_0712'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slideimage',
            name='image',
            field=models.ImageField(default=None, max_length=254, null=True, upload_to=b'slide_images'),
            preserve_default=True,
        ),
    ]
