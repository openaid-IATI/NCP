# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0021_auto_20150726_1619'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slideimage',
            name='image',
            field=models.ImageField(default=None, max_length=254, null=True, upload_to=b'static/slide_images'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='slideimage',
            name='image_type',
            field=models.CharField(default=b'mainImage', max_length=100, choices=[(b'mainImage', b'Main image'), (b'rsrImage', b'RSR image'), (b'rsrUpdate1', b'RSR update #1 image'), (b'rsrUpdate2', b'RSR update #2 image')]),
            preserve_default=True,
        ),
    ]
