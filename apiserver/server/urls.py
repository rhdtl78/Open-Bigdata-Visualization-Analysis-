from django.conf.urls import url, include
# from router.processor import outlier
from . import views
from .router.processor import outlier, notavailable
from .router.analyzer import a

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^outlier$', outlier.process, name='outlier'),
    url(r'^notavailable$', notavailable.process, name='notavailable')
]
