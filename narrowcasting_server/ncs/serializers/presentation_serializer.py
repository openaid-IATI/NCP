from django.conf import settings

import json
import requests
from urllib2 import Request
from urllib2 import urlopen
from rest_framework import serializers

from ncs.models import Presentation
from ncs.models import Slide
from ncs.models import SlideImage
from ncs.serializers.slide_serializer import SlideSerializer


class PresentationSerializer(serializers.ModelSerializer):
    # creator = AccountSerializer(read_only=True, required=False)
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

    def editable_field(self, text, font_size, color, font_weight, font_style, text_decoration):

        return {
            'text': text,
            'cssStyle': {
                'font-size': font_size,
                'color': color,
                'font-weight': font_weight,
                'font-style': font_style,
                'text-decoration': text_decoration,
            }
        }

    def get_rsr_data(self, slide):

        url = settings.RSR_URL + '/project/' + slide['activity_id'] + '/?format=json'
        headers = {}
        response = requests.get(url, headers=headers)
        slide_data = response.json()

        # rsr updates
        url = settings.RSR_URL + '/project_update/?format=json&limit=2&project=' + slide['activity_id']
        response = requests.get(url, headers=headers)
        rsr_updates = response.json()
        rsr_updates = rsr_updates['results']

        updateCount = 0
        for update in rsr_updates:
            url = settings.RSR_URL + '/user/' + str(rsr_updates[updateCount]['user']) + '/?format=json'
            response = requests.get(url, headers=headers)
            user = response.json()
            user = user['first_name'] + ' ' + user['last_name']
            rsr_updates[updateCount]['user'] = user
            updateCount = updateCount + 1

        slide_data['rsr_updates'] = rsr_updates

        # get partners
        partners = []
        for partner in slide_data['partners']:
            url = settings.RSR_URL + '/organisation/' + str(partner) + '/?format=json'
            response = requests.get(url, headers=headers)
            partnerdata = response.json()
            partners.append(partnerdata['name'])
        slide_data['partners'] = ', '.join(partners)

        slide_data = self.map_rsr_fields(slide_data)

        # get location
        if 'primary_location' in slide_data and slide_data['primary_location'] is not None:

            url = settings.RSR_URL + '/project_location/' + str(slide_data['primary_location']) + '/?format=json'
            response = requests.get(url, headers=headers)
            slide_data['primary_location'] = response.json()
            slide_data['primary_location_name'] = self.editable_field(slide_data['primary_location']['city'], '1.2em', '#000000', 'bold', 'normal', 'none')


        return slide_data

    def map_rsr_fields(self, slide_data):

        slide_data['backgroundColor'] = '#29abe2'
        slide_data['title'] = self.editable_field(slide_data['title'], '1.7em', '#000000', 'bold', 'normal', 'none')
        slide_data['subtitle'] = self.editable_field(slide_data['subtitle'], '1.2em', '#ffffff', 'bold', 'normal', 'none')
        slide_data['goals_overview'] = self.editable_field(slide_data['goals_overview'], '1.2em', '#000000', 'bold', 'normal', 'none')
        slide_data['project_plan_summary'] = self.editable_field(slide_data['project_plan_summary'], '1em', '#000000', 'bold', 'normal', 'none')
        slide_data['budget'] = self.editable_field(slide_data['budget'], '1.6em', '#000000', 'bold', 'normal', 'none')
        slide_data['target_group'] = self.editable_field(slide_data['target_group'], '0.9em', '#000000', 'bold', 'normal', 'none')
        slide_data['partners'] = self.editable_field(slide_data['partners'], '0.9em', '#000000', 'bold', 'normal', 'none')

        for i in range(len(slide_data['rsr_updates'])):
            slide_data['rsr_updates'][i]['title'] = self.editable_field(slide_data['rsr_updates'][i]['title'], '0.8em', '#000000', 'bold', 'normal', 'none')

        return slide_data

    def get_iati_data(self, slide):
        request = Request(settings.OIPA_URL + '/activities/' + slide['activity_id'] + '/?format=json')
        response = urlopen(request)
        slide_data = json.loads(response.read())
        slide_data = self.map_iati_fields(slide_data)
        return slide_data

    def map_iati_fields(self, slide_data):

        slide_data['backgroundColor'] = '#22b573'

        if len(slide_data['titles']) > 0:
            slide_data['title'] = self.editable_field(slide_data['titles'][0]['title'], '1.6em', '#000000', 'bold', 'normal', 'none')

        if len(slide_data['descriptions']) > 0:
            slide_data['description'] = self.editable_field(slide_data['descriptions'][0]['description'], '1.6em', '#000000', 'bold', 'normal', 'none')

        if len(slide_data['sectors']) > 0:
            sectors = []
            for sector in slide_data['sectors']:
                sectors.append(sector['name'])
            sector_names = ', '.join(sectors)
            slide_data['sectors'] = self.editable_field(sector_names, '1.4em', '#969696', 'bold', 'normal', 'none')

        if len(slide_data['transactions']) > 0:
            disbursements = 0
            for transaction in slide_data['transactions']:
                if transaction['transaction_type'] == 'D':
                    disbursements = disbursements + float(transaction['value'])
            slide_data['total_disbursement'] = str(disbursements)

        if len(slide_data['participating_organisations']) > 0:
            part_orgs = []
            for part_org in slide_data['participating_organisations']:
                part_orgs.append(part_org['name'])
            part_org_names = ', '.join(part_orgs)

            slide_data['participating_organisations'] = self.editable_field(part_org_names, '1.4em', '#969696', 'bold', 'normal', 'none')

        return slide_data

    def map_content_fields(self, slide):

        slide['activity_id'] = 'content-slide-' + str(slide['position'])
        slide_data = {'activity_id': slide['activity_id']}
        slide_data['title'] = self.editable_field('Empty content slide', '1.6em', '#000000', 'bold', 'normal', 'none')
        slide_data['description'] = self.editable_field('Description ...', '1.2em', '#969696', 'bold', 'normal', 'none')

        return slide_data

    def create_slide(self, slide, presentation):

        if slide['source'] == 'iati':
            slide_data = self.get_iati_data(slide)

        if slide['source'] == 'rsr':
            slide_data = self.get_rsr_data(slide)

        if slide['source'] == 'content':
            slide_data = self.map_content_fields(slide)

        new_slide = Slide(
            activity_id=slide['activity_id'],
            slideContent='empty',
            previewData=slide['previewData'],
            position=slide['position'],
            source=slide['source'],
            presentation=presentation)

        new_slide.save()

        if slide['source'] == 'rsr':

            from django.core.files import File
            from django.core.files.temp import NamedTemporaryFile
            import urllib2


            if 'current_image' in slide_data and slide_data['current_image'] is not '' and slide_data['current_image']:
                url = 'http://rsr.akvo.org' + slide_data['current_image']

                img_temp = NamedTemporaryFile(delete=True)
                img_temp.write(urlopen(url).read())
                img_temp.flush()

                new_slide_image = SlideImage(image=File(img_temp), image_type='rsrImage', slide=new_slide)
                new_slide_image.save()



            # save rsr update images
            thiscount = 1
            for rsrUpdate in slide_data['rsr_updates']:

                if rsrUpdate['photo'] and rsrUpdate['photo'] != '':

                    img_temp = NamedTemporaryFile(delete=True)
                    img_temp.write(urlopen('http://rsr.akvo.org'+rsrUpdate['photo']).read())
                    img_temp.flush()

                    new_slide_image = SlideImage(image=File(img_temp), image_type='rsrUpdate'+str(thiscount), slide=new_slide)
                    new_slide_image.save()

                    thiscount = thiscount + 1

            # get google image from location
            if 'primary_location' in slide_data and slide_data['primary_location'] is not None:

                url = 'https://maps.googleapis.com/maps/api/staticmap'
                url += '?zoom=13&size=700x300&maptype=roadmap&markers=color:green%7Clabel:%7C'
                url += str(slide_data['primary_location']['latitude']) + ','
                url += str(slide_data['primary_location']['longitude'])

                img_temp = NamedTemporaryFile(delete=True)
                img_temp.write(urlopen(url).read())
                img_temp.flush()

                new_slide_image = SlideImage(image=File(img_temp), image_type='googleMapImage', slide=new_slide)
                new_slide_image.save()

        new_slide.slideContent = json.dumps(slide_data)
        new_slide.save()

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


        if 'status' in validated_data:
            instance.status = validated_data['status']
        if 'name' in validated_data:
            instance.name = validated_data['name']
        instance.save()
        return instance

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PresentationSerializer, self).get_validation_exclusions()

        return exclusions + ['creator']