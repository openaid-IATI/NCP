# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0011_auto_20150617_1351'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='isPreviewed',
            field=models.SmallIntegerField(default=0),
            preserve_default=True,
        ),
    ]
