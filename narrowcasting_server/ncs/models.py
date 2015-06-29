from django.db import models
from authentication.models import Account


class Presentation(models.Model):
    name = models.CharField(null=False, blank=False, max_length=100)
    creator = models.ForeignKey(Account)
    status = models.TextField(default='draft', choices=(
        ('draft', 'Draft'),
        ('published', 'Published'),
    ))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{0}'.format(self.name)


class Slide(models.Model):
    activity_id = models.CharField(null=False, blank=False, default='none', max_length=100)
    position = models.SmallIntegerField(default=0)
    content = models.TextField()
    previewData = models.TextField(default='')
    source = models.CharField(null=False, blank=False, default='iati', max_length=100)
    mainImage = models.ImageField(upload_to='images', max_length=254, default=None)
    backgroundImage = models.ImageField(upload_to='images', max_length=254, default=None)
    presentation = models.ForeignKey(Presentation)
    isPreviewed = models.SmallIntegerField(default=0)


class Display(models.Model):
    owner = models.ForeignKey(Account)
    name = models.CharField(null=False, blank=False, max_length=100)
    unlock_key = models.CharField(null=True, blank=False, max_length=100)
    unlocked = models.BooleanField(null=False, default=False)
    added_at = models.DateTimeField(auto_now_add=True)
    presentation = models.ForeignKey(Presentation, null=True)


#
# class PlaylistItem(models.Model):
#     playlist = models.ForeignKey('Playlist')
#     presentation = models.ForeignKey(Presentation)
#
#     def __unicode__(self):
#         return ' '.join([self.presentation.name, self.playlist.name])
#
#
# class Playlist(models.Model):
#     creator = models.ForeignKey(Account)
#     name = models.CharField(null=False, blank=False, max_length=100)
#     presentations = models.ManyToManyField(
#         Presentation,
#         through='PlaylistItem',
#     )
#
#
# class PlaylistItemDays(models.Model):
#     playlistItem = models.ForeignKey(PlaylistItem)
#     day = models.CharField(
#         null=False,
#         blank=False,
#         max_length=50,
#         choices= (
#             ('monday', 'Monday'),
#             ('tuesday', 'Tuesday'),
#             ('wednesday', 'Wednesday'),
#             ('thursday', 'Thursday'),
#             ('friday', 'Friday'),
#             ('saturday', 'Saturday'),
#             ('sunday', 'Sunday'),
#         )
#     )
