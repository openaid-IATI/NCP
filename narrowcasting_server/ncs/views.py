from rest_framework import permissions
from rest_framework import viewsets

from ncs.models import Presentation
from ncs.models import Display
from ncs.permissions import IsCreatorOfPresentation
from ncs.serializers import PresentationSerializer

class PresentationViewSet(viewsets.ModelViewSet):
    queryset = Presentation.objects.order_by('-created_at')
    serializer_class = PresentationSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsCreatorOfPresentation(),)

    def perform_create(self, serializer):
        instance = serializer.save(creator=self.request.user)

        return super(PresentationViewSet, self).perform_create(serializer)


class DisplayViewSet(viewsets.ModelViewSet):
    queryset = Display.objects.order_by('-created_at')
    serializer_class = PresentationSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsCreatorOfPresentation(),)

    def perform_create(self, serializer):
        instance = serializer.save(creator=self.request.user)

        return super(PresentationViewSet, self).perform_create(serializer)



class AccountPresentationsViewSet(viewsets.ViewSet):
    queryset = Presentation.objects.select_related('creator').all()
    serializer_class = PresentationSerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
