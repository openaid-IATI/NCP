# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0020_auto_20150725_1234'),
    ]

    operations = [
        migrations.RenameField(
            model_name='slideimage',
            old_name='imageType',
            new_name='image_type',
        ),
    ]
