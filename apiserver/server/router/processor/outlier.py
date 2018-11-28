import pandas as pd
import numpy
from ... import firebase_init
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def process(request):
    db = firebase_init.db
    body = json.loads(request.body.decode('utf-8'))
    uid = body['uid']
    minArray = body['minArray']
    maxArray = body['maxArray']
    seqNames = body['variableArray']
    ref = db.reference("/" + uid + "/tmp")
    snapshot = ref.get()
    data = snapshot['data']

    dataList = []
    for key, value in data.items():
        dataList.append(value)


    postData = pd.DataFrame(dataList)

    colName = postData.columns.values.tolist()
    for idx, element in enumerate(colName):
        element = element.replace("&35;", "#")
        element = element.replace("&36;", "$")
        element = element.replace("&46;", ".")
        element = element.replace("&91;", "[")
        element = element.replace("&93;", "]")
        element = element.replace("&47;", "/")
        colName[idx] = element

    postData.columns = colName


    if minArray != None:
        for idx, element in enumerate(minArray):
            if element != None:
                postData = postData[postData.get(
                    seqNames[idx]) > float(element)]


    if maxArray != None:
        for idx, element in enumerate(maxArray):
            if element != None:
                postData = postData[postData.get(
                    seqNames[idx]) < float(element)]

    return JsonResponse({"snapshot": postData.to_json(orient='records')})
