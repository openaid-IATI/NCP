# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='display',
            name='presentation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.SET_NULL, to='ncs.Presentation', null=True),
            preserve_default=True,
        ),
    ]
