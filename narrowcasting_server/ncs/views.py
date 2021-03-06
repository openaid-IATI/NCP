import requests
import urllib

from django.http import JsonResponse
from django.conf import settings
from django.shortcuts import render

from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.parsers import FormParser
from rest_framework.parsers import MultiPartParser
from rest_framework.parsers import JSONParser
from rest_framework.filters import DjangoFilterBackend
from rest_framework.response import Response

from ncs.models import Presentation
from ncs.models import Display
from ncs.models import Slide
from ncs.models import SlideImage

from ncs.permissions import IsCreatorOfPresentation
from ncs.permissions import IsOwnerOfDisplay
from ncs.serializers.presentation_serializer import PresentationSerializer
from ncs.serializers.display_serializer import DisplaySerializer
from ncs.serializers.slide_serializer import SlideSerializer
from ncs.serializers.slideimage_serializer import SlideImageSerializer


class SlideImageViewSet(viewsets.ModelViewSet):
    queryset = SlideImage.objects.all()
    serializer_class = SlideImageSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser,)
    filter_fields = ('slide',)

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(),)

    def perform_create(self, serializer):
        serializer.save()
        return super(SlideImageViewSet, self).perform_create(serializer)

    def perform_update(self, serializer):
        serializer.save()


class SlideViewSet(viewsets.ModelViewSet):
    queryset = Slide.objects.order_by('position')
    serializer_class = SlideSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser,)

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(),)

    def perform_create(self, serializer):
        serializer.save()
        return super(SlideViewSet, self).perform_create(serializer)

    def perform_update(self, serializer):
        serializer.save()


class PresentationViewSet(viewsets.ModelViewSet):
    queryset = Presentation.objects.order_by('-created_at')
    serializer_class = PresentationSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('status',)

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsCreatorOfPresentation(),)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
        return super(PresentationViewSet, self).perform_create(serializer)


class DisplayViewSet(viewsets.ModelViewSet):
    queryset = Display.objects.order_by('-added_at')
    serializer_class = DisplaySerializer

    def get_permissions(self):
        return (permissions.AllowAny(),)

        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsOwnerOfDisplay(),)

    def perform_create(self, serializer):
        instance = serializer.save(owner=self.request.user)

        return super(DisplayViewSet, self).perform_create(serializer)


    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serialize(instance, data=request.data, partial=True)


class AccountPresentationsViewSet(viewsets.ViewSet):
    queryset = Presentation.objects.select_related('creator').all()
    serializer_class = PresentationSerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)


def RsrView(request):
    headers = {}
    call = request.GET['call']
    filters = request.GET['filters']
    filters = urllib.unquote(filters)
    url = settings.RSR_URL + '/' + call + '/?format=json&publishingstatus__status=published' + filters
    result = requests.get(url, headers=headers)
    data = result.json()
    return JsonResponse(data)


def preview(request, presentation_id):
    return render(request, 'preview.html', {'presentation_id': presentation_id})