# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0016_activity_source'),
    ]

    operations = [
        migrations.CreateModel(
            name='Slide',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('activity_id', models.CharField(default=b'none', max_length=100)),
                ('position', models.SmallIntegerField(default=0)),
                ('content', models.TextField()),
                ('previewData', models.TextField(default=b'')),
                ('source', models.CharField(default=b'iati', max_length=100)),
                ('mainImage', models.ImageField(default=None, max_length=254, upload_to=b'images')),
                ('backgroundImage', models.ImageField(default=None, max_length=254, upload_to=b'images')),
                ('isPreviewed', models.SmallIntegerField(default=0)),
                ('presentation', models.ForeignKey(to='ncs.Presentation')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='activity',
            name='presentation',
        ),
        migrations.DeleteModel(
            name='Activity',
        ),
    ]
