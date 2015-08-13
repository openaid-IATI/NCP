# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0023_auto_20150803_0828'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='slide',
            options={'ordering': ('position',)},
        ),
        migrations.AlterField(
            model_name='slideimage',
            name='slide',
            field=models.ForeignKey(related_name='slide_image_set', to='ncs.Slide'),
            preserve_default=True,
        ),
    ]
