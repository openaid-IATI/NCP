# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0006_presentation_status'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Clients',
            new_name='Displays',
        ),
    ]
