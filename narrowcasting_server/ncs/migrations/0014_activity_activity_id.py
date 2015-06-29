# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0013_auto_20150618_1150'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='activity_id',
            field=models.CharField(default=b'none', max_length=100),
            preserve_default=True,
        ),
    ]
