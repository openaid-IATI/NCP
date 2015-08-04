# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0022_auto_20150726_1643'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slideimage',
            name='image_type',
            field=models.CharField(default=b'mainImage', max_length=100, choices=[(b'mainImage', b'Main image'), (b'rsrImage', b'RSR image'), (b'googleMapImage', b'Google maps image'), (b'rsrUpdate1', b'RSR update #1 image'), (b'rsrUpdate2', b'RSR update #2 image')]),
            preserve_default=True,
        ),
    ]
