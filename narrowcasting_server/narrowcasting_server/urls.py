from django.conf.urls import patterns
from django.conf.urls import include
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings

from narrowcasting_server.views import IndexView
from ncs.views import PresentationViewSet
from ncs.views import DisplayViewSet
from ncs.views import SlideViewSet
from ncs.views import RsrView
from ncs.views import SlideImageViewSet

from rest_framework_nested import routers

from authentication.views import AccountViewSet
from authentication.views import LoginView
from authentication.views import LogoutView

from ncs.views import preview

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'presentations', PresentationViewSet)
router.register(r'displays', DisplayViewSet)
router.register(r'slides', SlideViewSet)
router.register(r'slideImages', SlideImageViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)

urlpatterns = patterns(
    '',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^preview/(?P<presentation_id>[0-9]+)/$', preview),
    url(r'^rsr/', RsrView),
     # url(r'^api/v1/slideImage/', SlideImageViewSet.as_view(), name='slide-image'),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

    (r'^media/(?P<path>.*)$', 'django.views.static.serve',   
        {'document_root':settings.MEDIA_ROOT}),
    url('^.*$', IndexView.as_view(), name='index'),
)

