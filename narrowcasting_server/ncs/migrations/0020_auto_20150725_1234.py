# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0019_auto_20150708_0650'),
    ]

    operations = [
        migrations.CreateModel(
            name='SlideImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image', models.ImageField(default=None, max_length=254, null=True, upload_to=b'images')),
                ('imageType', models.CharField(default=b'mainImage', max_length=100)),
                ('slide', models.ForeignKey(to='ncs.Slide')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='slide',
            name='backgroundImage',
        ),
        migrations.RemoveField(
            model_name='slide',
            name='mainImage',
        ),
    ]
