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
