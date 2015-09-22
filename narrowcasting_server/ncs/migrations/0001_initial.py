# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Display',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('unlock_key', models.CharField(max_length=100, null=True)),
                ('unlocked', models.BooleanField(default=False)),
                ('added_at', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Presentation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('status', models.TextField(default=b'draft', choices=[(b'draft', b'Draft'), (b'published', b'Published')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('creator', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Slide',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('activity_id', models.CharField(default=b'none', max_length=100)),
                ('position', models.SmallIntegerField(default=0)),
                ('slideContent', models.TextField()),
                ('previewData', models.TextField(default=b'')),
                ('source', models.CharField(default=b'iati', max_length=100)),
                ('isPreviewed', models.SmallIntegerField(default=0)),
                ('presentation', models.ForeignKey(to='ncs.Presentation')),
            ],
            options={
                'ordering': ('position',),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SlideImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image', models.ImageField(default=None, max_length=254, null=True, upload_to=b'slide_images')),
                ('image_type', models.CharField(default=b'mainImage', max_length=100, choices=[(b'mainImage', b'Main image'), (b'rsrImage', b'RSR image'), (b'googleMapImage', b'Google maps image'), (b'rsrUpdate1', b'RSR update #1 image'), (b'rsrUpdate2', b'RSR update #2 image')])),
                ('slide', models.ForeignKey(related_name='slide_image_set', to='ncs.Slide')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='display',
            name='presentation',
            field=models.ForeignKey(to='ncs.Presentation', null=True),
            preserve_default=True,
        ),
    ]
