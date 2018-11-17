import pandas as pd
import numpy as np
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
    columns = postData.columns.tolist()
    mask = (postData == 'None')
    for column in columns:
        postData.loc[mask[column]] = np.nan
    
    print ("before\n")
    print (postData)
    print (postData.columns)
    print (variable)

    for index, proc in enumerate(process):
        column = variable[index]
        if proc == 'remove':
            postData = postData.dropna(subset=[column])
        elif proc == 'median':
            median = postData[column].median()
            postData.loc[mask[column]] = median
        elif proc == 'mean':
            mean = postData[column].mean()
            postData.loc[mask[column]] = mean

    print ("after")
    print (postData)

    return JsonResponse({"snapshot": postData.to_json(orient='records')}, safe=False)
