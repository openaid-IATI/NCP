from django.conf.urls import patterns
from django.conf.urls import include
from django.conf.urls import url

from narrowcasting_server.views import IndexView
from ncs.views import AccountPresentationsViewSet
from ncs.views import PresentationViewSet
from ncs.views import DisplayViewSet

from rest_framework_nested import routers

from authentication.views import AccountViewSet
from authentication.views import LoginView
from authentication.views import LogoutView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'presentations', PresentationViewSet)
router.register(r'displays', DisplayViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)

urlpatterns = patterns(
    '',
#    url(r'', include('two_factor.urls', 'two_factor')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url('^.*$', IndexView.as_view(), name='index'),
)
