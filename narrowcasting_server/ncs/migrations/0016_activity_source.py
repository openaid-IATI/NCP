# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0015_activity_previewdata'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='source',
            field=models.CharField(default=b'iati', max_length=100),
            preserve_default=True,
        ),
    ]
