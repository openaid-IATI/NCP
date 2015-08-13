from rest_framework import serializers
from ncs.models import Slide
from ncs.serializers.slideimage_serializer import SlideImageSerializer


class SlideSerializer(serializers.ModelSerializer):
    slide_image_set = SlideImageSerializer(many=True, read_only=True)

    class Meta:
        model = Slide
        fields = (
            'id',
            'activity_id',
            'position',
            'slideContent',
            'previewData',
            'presentation',
            'isPreviewed',
            'source',
            'slide_image_set'
        )
        read_only_fields = (
            'id',
            'slide_image_set'
        )

    def create(self, validated_data):
        return Slide(**validated_data)

    def update(self, instance, validated_data):

        instance.slideContent = validated_data.get('slideContent', instance.slideContent)
        instance.save()
        return instance

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(SlideSerializer, self).get_validation_exclusions()

        return exclusions + ['creator']