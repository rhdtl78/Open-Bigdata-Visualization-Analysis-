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

    for column in columns:
        postData = postData.replace({column: "None"}, {column: np.nan})

    # print ("before\n")
    # print (postData)
    # print (postData.columns)
    # print (variable)
    # print (process)

    medians = postData.median()
    means = postData.mean()

    print (medians, means)

    print ("before")
    print (postData)

    for index, proc in enumerate(process):
        column = variable[index]
        print (column, medians[column])
        if proc == 'remove':
            postData = postData.dropna(subset=[column])
        elif proc == 'median':
            postData = postData.fillna(medians[column:])
        elif proc == 'mean':
            postData = postData.fillna(means[column:])

    print ("after")
    print (postData)

    return JsonResponse({"snapshot": postData.to_json(orient='records')}, safe=False)
