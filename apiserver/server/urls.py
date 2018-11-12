from django.conf.urls import url, include
# from router.processor import outlier
from . import views
from .router.processor import outlier, transform
from .router.analyzer import a

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^outlier$', outlier.process, name='outlier'),
    url(r'^transform$', transform.process, name='transform')
]
