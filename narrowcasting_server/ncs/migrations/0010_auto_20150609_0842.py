# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0009_auto_20150601_1426'),
    ]

    operations = [
        migrations.AlterField(
            model_name='display',
            name='presentation',
            field=models.ForeignKey(to='ncs.Presentation', null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='display',
            name='unlock_key',
            field=models.CharField(max_length=100, null=True),
            preserve_default=True,
        ),
    ]
