# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0018_auto_20150629_0905'),
    ]

    operations = [
        migrations.RenameField(
            model_name='slide',
            old_name='content',
            new_name='slideContent',
        ),
    ]
