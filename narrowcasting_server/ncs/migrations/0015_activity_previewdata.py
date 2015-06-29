# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0014_activity_activity_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='previewData',
            field=models.TextField(default=b''),
            preserve_default=True,
        ),
    ]
