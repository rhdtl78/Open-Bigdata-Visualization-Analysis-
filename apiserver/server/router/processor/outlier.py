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

    # print(dataList)
    postData = pd.DataFrame(dataList)

    # print(seqNames, postData.columns.values.tolist())
    colName = postData.columns.values.tolist()
    for idx, element in enumerate(colName):
        # print("before=  ", colName[idx])
        element = element.replace("&35;", "#")
        element = element.replace("&36;", "$")
        element = element.replace("&46;", ".")
        element = element.replace("&91;", "[")
        element = element.replace("&93;", "]")
        element = element.replace("&47;", "/")
        colName[idx] = element
        # print("element= ", element)
        # print("after=  ",colName[idx])
    
    # print("colName =  ",colName)
    postData.columns = colName
    # for idx, element in enumerate(seqNames):
    #     postData.columns.values[idx] = element

    
    print(postData)
    if minArray != None:
        for idx, element in enumerate(minArray):
            if element != None:
                
                # print(element, seqNames[idx])
                postData = postData[postData.get(
                    seqNames[idx]) > float(element)]
                # print(postData.get(seqNames[idx]))

    if maxArray != None:
        for idx, element in enumerate(maxArray):
            if element != None:
                # print(element, seqNames[idx])
                postData = postData[postData.get(
                    seqNames[idx]) < float(element)]

    return JsonResponse({"snapshot": postData.to_json(orient='records')})
