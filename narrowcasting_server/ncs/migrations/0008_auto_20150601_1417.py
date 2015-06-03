# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ncs', '0007_auto_20150601_1414'),
    ]

    operations = [
        migrations.CreateModel(
            name='Display',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('unlock_key', models.CharField(max_length=100)),
                ('unlocked', models.BooleanField(default=False)),
                ('presentation', models.ForeignKey(to='ncs.Presentation')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.DeleteModel(
            name='Displays',
        ),
        migrations.RemoveField(
            model_name='playlist',
            name='creator',
        ),
        migrations.RemoveField(
            model_name='playlist',
            name='presentations',
        ),
        migrations.RemoveField(
            model_name='playlistitem',
            name='playlist',
        ),
        migrations.DeleteModel(
            name='Playlist',
        ),
        migrations.RemoveField(
            model_name='playlistitem',
            name='presentation',
        ),
        migrations.RemoveField(
            model_name='playlistitemdays',
            name='playlistItem',
        ),
        migrations.DeleteModel(
            name='PlaylistItem',
        ),
        migrations.DeleteModel(
            name='PlaylistItemDays',
        ),
    ]
