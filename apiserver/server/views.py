# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

import json
from django.http import HttpResponse, JsonResponse


def index(request):

    return JsonResponse({'message': "hello"})
