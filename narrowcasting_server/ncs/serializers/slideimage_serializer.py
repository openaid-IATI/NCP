from rest_framework import serializers
from ncs.models import SlideImage


class SlideImageSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()

    class Meta:
        model = SlideImage
        fields = (
            'id',
            'slide',
            'image_type',
            'image_url',
            'image'
        )
        read_only_fields = (
            'id',
        )

    def get_image_url(self, slide_image):
        image_url = slide_image.image.url.replace('slide_images', 'static')
        return image_url

    def create(self, validated_data):
        image = self.initial_data.get('file')
        validated_data['image'] = image
        # if old one exists, remove
        SlideImage.objects.filter(
            slide_id=validated_data.get('slide'),
            image_type=validated_data.get('image_type')
        ).delete()

        return SlideImage(**validated_data)

    def update(self, instance, validated_data):
        instance.save()
        return instance

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(SlideImageSerializer, self).get_validation_exclusions()

        return exclusions
