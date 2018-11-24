from django.conf.urls import url, include
# from router.processor import outlier
from . import views
from .router.processor import outlier, transform
from .router.analyzer import a,regression, apriori, anova

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^outlier$', outlier.process, name='outlier'),
    url(r'^transform$', transform.process, name='transform'),
    url(r'^regression$', regression.process, name='regression'),
    url(r'^apriori$', apriori.process, name='apriori'),
    url(r'^anova$', anova.process, name='anova')
]
