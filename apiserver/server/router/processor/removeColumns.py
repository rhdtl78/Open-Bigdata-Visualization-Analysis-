import pandas as pd
import numpy
from ... import firebase_init
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ...libs import Coder
coder = Coder.Coder()

@csrf_exempt
def process(request): 
    body = json.loads(request.body.decode('utf-8'))
    uid = body['uid']
    colSelect = body['colSelect']

    print (uid, colSelect)

    db = firebase_init.db
    ref = db.reference("/" + uid + "/tmp")
    snapshot = ref.get()

    data = snapshot['data']

    postData = coder.escape(data)

    postData = postData.drop(columns=colSelect)

    return JsonResponse(postData.to_json(orient="records"), safe=False)