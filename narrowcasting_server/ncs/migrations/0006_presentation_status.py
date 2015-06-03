# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0005_auto_20150528_1442'),
    ]

    operations = [
        migrations.AddField(
            model_name='presentation',
            name='status',
            field=models.TextField(default=b'draft', choices=[(b'draft', b'Draft'), (b'published', b'Published')]),
            preserve_default=True,
        ),
    ]
