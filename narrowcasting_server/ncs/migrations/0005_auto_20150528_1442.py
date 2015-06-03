# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0004_auto_20150309_2226'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Collection',
            new_name='Presentation',
        ),
        migrations.RenameField(
            model_name='playlist',
            old_name='collections',
            new_name='presentations',
        ),
        migrations.RenameField(
            model_name='playlistitem',
            old_name='collection',
            new_name='presentation',
        ),
    ]
