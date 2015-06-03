# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ncs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlaylistItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('collection', models.ForeignKey(to='ncs.Collection')),
                ('playlist', models.ForeignKey(to='ncs.Playlist')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PlaylistItemDays',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('day', models.CharField(max_length=50, choices=[(b'monday', b'Monday'), (b'tuesday', b'Tuesday'), (b'wednesday', b'Wednesday'), (b'thursday', b'Thursday'), (b'friday', b'Friday'), (b'saturday', b'Saturday'), (b'sunday', b'Sunday')])),
                ('playlistItem', models.ForeignKey(to='ncs.PlaylistItem')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='collection',
            name='creator',
            field=models.ForeignKey(default=1, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='collection',
            name='projects',
            field=models.TextField(default=b''),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='playlist',
            name='collections',
            field=models.ManyToManyField(to='ncs.Collection', through='ncs.PlaylistItem'),
            preserve_default=True,
        ),
    ]
