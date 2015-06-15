from rest_framework import serializers

from authentication.serializers import AccountSerializer

from ncs.models import Presentation
from ncs.models import Display

class PresentationSerializer(serializers.ModelSerializer):
    creator = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Presentation

        fields = (
            'id',
            'name',
            'creator',
            'created_at',
            'updated_at',
            'status'
        )
        read_only_fields = (
            'id',
            'creator',
            'created_at',
            'updated_at'
        )

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