# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0010_auto_20150609_0842'),
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('position', models.SmallIntegerField(default=0)),
                ('content', models.TextField()),
                ('mainImage', models.ImageField(max_length=254, upload_to=b'images')),
                ('backgroundImage', models.ImageField(max_length=254, upload_to=b'images')),
                ('presentation', models.ForeignKey(to='ncs.Presentation')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='presentation',
            name='projects',
        ),
    ]
