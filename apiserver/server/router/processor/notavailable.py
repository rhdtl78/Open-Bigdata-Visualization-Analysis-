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
    print ("/apiserver/server/notavailable")
    db = firebase_init.db
    body = json.loads(request.body.decode('utf-8'))
    uid = body['uid']
    process = body['process']
    variable = body['variable']
    ref = db.reference("/" + uid + "/tmp")
    snapshot = ref.get()
    data = snapshot['data']
    
    postData = coder.escape(data)
    print ("before\n")
    print (postData)
    print (postData.columns)
    print (variable)

    for index, proc in enumerate(process):
        if proc == 'remove':
            postData = postData['Sepal.Width'].dropna()
        elif proc == 'median':
            postData[variable[index]].where(pd.notnull(postData)[variable[index]], postData[variable[index]].median(), axis='columns')            
        elif proc == 'mean':
            postData[variable[index]].where(pd.notnull(postData)[variable[index]], postData[variable[index]].mean(), axis='columns')

    print ("after")
    print (postData)

    return JsonResponse({"snapshot": postData.to_json(orient='records')}, safe=False)
