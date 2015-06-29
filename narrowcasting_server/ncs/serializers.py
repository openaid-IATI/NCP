from django.conf import settings
import json

from urllib2 import Request
from urllib2 import urlopen
from urllib2 import URLError

from rest_framework import serializers
from authentication.serializers import AccountSerializer

from ncs.models import Presentation
from ncs.models import Display
from ncs.models import Slide

class SlideSerializer(serializers.ModelSerializer):
    creator = AccountSerializer(read_only=True, required=False)
    slide_content = serializers.SerializerMethodField()

    class Meta:
        model = Slide
        fields = (
            'id',
            'activity_id',
            'creator',
            'position',
            'content',
            'slide_content',
            'previewData',
            'mainImage',
            'backgroundImage',
            'presentation',
            'isPreviewed',
            'source'
        )
        read_only_fields = (
            'id',
            'creator',
            'presentation'
        )

    def get_slide_content(self, slide):
        return json.loads(slide.content)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(SlideSerializer, self).get_validation_exclusions()

        return exclusions + ['creator']


class PresentationSerializer(serializers.ModelSerializer):
    creator = AccountSerializer(read_only=True, required=False)
    slide_set = SlideSerializer(many=True, read_only=False, required=True)

    class Meta:
        model = Presentation

        fields = (
            'id',
            'name',
            'creator',
            'created_at',
            'updated_at',
            'status',
            'slide_set'
        )
        read_only_fields = (
            'id',
            'creator',
            'created_at',
            'updated_at'
        )

    def create(self, validated_data):
        del validated_data['slide_set']
        return Presentation(**validated_data)

    def map_iati_fields(self, slide_data):

        if len(slide_data['titles']) > 0:
            slide_data['title'] = {
                'text': slide_data['titles'][0]['title'],
                'cssStyle': {
                    'font-size': '22px',
                    'color': '#000000',
                    'font-weight': 'bold',
                    'font-style': 'normal',
                    'text-decoration': 'none',
                }
            }

        if len(slide_data['descriptions']) > 0:
            slide_data['description'] = {
                'text': slide_data['descriptions'][0]['description'],
                'cssStyle': {
                    'font-size': '16px',
                    'color': '#969696',
                    'font-weight': 'bold',
                    'font-style': 'normal',
                    'text-decoration': 'none',
                }
            }

        if len(slide_data['sectors']) > 0:
            sectors = []
            for sector in slide_data['sectors']:
                sectors.append(sector['name'])
            slide_data['sectors'] = {
                'text': ', '.join(sectors),
                'cssStyle': {
                    'font-size': '19px',
                    'color': '#969696',
                    'font-weight': 'bold',
                    'font-style': 'normal',
                    'text-decoration': 'none',
                }
            }

        if len(slide_data['participating_organisations']) > 0:
            part_orgs = []
            for part_org in slide_data['participating_organisations']:
                part_orgs.append(part_org['name'])
            slide_data['participating_organisations'] = {
                'text': ', '.join(part_orgs),
                'cssStyle': {
                    'font-size': '19px',
                    'color': '#969696',
                    'font-weight': 'bold',
                    'font-style': 'normal',
                    'text-decoration': 'none',
                }
            }

        return slide_data

    def create_slide(self, slide, presentation):

        if slide['source'] == 'iati':
            request = Request(settings.OIPA_URL + '/activities/' + slide['activity_id'] + '/?format=json')

        if slide['source'] == 'rsr':
            request = Request(settings.RSR_URL + '/project/' + slide['activity_id'] + '/?format=json')
            # get 2 latest rsr updates, and other stuff that's not in this call and we need

        try:
            response = urlopen(request)
            slide_data = json.loads(response.read())

            if slide['source'] == 'iati':
                slide_data = self.map_iati_fields(slide_data)

            slide_data = json.dumps(slide_data)

            new_slide = Slide(
                activity_id=slide['activity_id'],
                content=json.dumps(slide_data),
                previewData=slide['previewData'],
                position=slide['position'],
                source=slide['source'],
                presentation=presentation)

            new_slide.save()

        except URLError, e:
            print 'URLError'
            print e.message
            return False

    def update_slide(self, new_slide, presentation):

        slide = Slide.objects.get(presentation=presentation, activity_id=new_slide['activity_id'])
        slide.position = new_slide['position']
        slide.save()

    def update(self, instance, validated_data):

        # create 2 mappings; old en new slide id's, delete removed ones
        new_slides_activity_ids = []
        for new_slide in validated_data['slide_set']:
            new_slides_activity_ids.append(new_slide['activity_id'])

        slides = Slide.objects.filter(presentation_id=instance.id)
        old_slides_activity_ids = {}

        for slide in slides:
            if slide.activity_id in new_slides_activity_ids:
                old_slides_activity_ids[slide.activity_id] = {
                    'id': slide.id,
                    'position': slide.position
                }
            else:
                # remove deleted/overwritten slides
                # TO DO; maybe keep these
                slide.delete()


        # add/update others
        for new_slide in validated_data['slide_set']:

            # change position
            if new_slide['activity_id'] in old_slides_activity_ids:

                old_position = old_slides_activity_ids[new_slide['activity_id']]['position']
                if old_position != new_slide['position']:
                   self.update_slide(new_slide, instance)

            # add new
            else:
                self.create_slide(new_slide, instance)

        instance.save()
        return instance

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PresentationSerializer, self).get_validation_exclusions()

        return exclusions + ['creator']


class DisplaySerializer(serializers.ModelSerializer):
    owner = AccountSerializer(read_only=True, required=False)
    presentation = PresentationSerializer(read_only=True, required=False)

    class Meta:
        model = Display

        fields = (
            'id',
            'owner',
            'name',
            'unlock_key',
            'unlocked',
            'presentation',
            'added_at'
        )
        read_only_fields = (
            'id',
            'added_at',
            'owner'
        )


    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(DisplaySerializer, self).get_validation_exclusions()

        return exclusions + ['owner']

    def update(self, instance, validated_data):
        """
        Update and return an existing `Display` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.unlocked = validated_data.get('unlocked', instance.unlocked)

        if self.initial_data['presentation']:
            instance.presentation_id = self.initial_data['presentation']['id']
        # instance.presentation = validated_data.get('presentation', instance.presentation)
        instance.save()
        return instance