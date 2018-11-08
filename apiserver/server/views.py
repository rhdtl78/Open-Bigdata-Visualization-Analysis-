# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

import json
from django.http import HttpResponse, JsonResponse

import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate(
    '/home/kether/Git/obva/server/serviceAccount.json')
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://obva1234.firebaseio.com/'
})


def index(request):
    uid = request.GET.get('uid')
    print(uid)
    dbRef = "/"+uid
    print(dbRef)
    ref = db.reference(dbRef)
    snapshot = json.dumps(ref.get(), indent=' ')
    print (snapshot)

    return JsonResponse({'message': uid, 'snapshot' : snapshot})
