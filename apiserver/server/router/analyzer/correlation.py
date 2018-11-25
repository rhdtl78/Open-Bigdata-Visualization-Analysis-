import pandas as pd
from ... import firebase_init
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import numpy as np
import json

@csrf_exempt
def process(request):
    db = firebase_init.db
    body = json.loads(request.body.decode('utf-8'))
    uid = body['uid']
    select = body['select']
    ref = db.reference("/" + uid + "/tmp")
    snapshot = ref.get()
    data = snapshot['data']

    dataList = []
    for key, value in data.items():
        dataList.append(value)

    # print(dataList)
    df = pd.DataFrame(dataList)
    # print(seqNames, postData.columns.values.tolist())
    colName = df.columns.values.tolist()
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

    df.columns = colName
    corr = pd.DataFrame()
    for element in select:
        corr[element] = df[element]

    corrTable = corr.corr().to_records();
    result = []
    for element in corrTable:
        result.append(str(element))

    return JsonResponse({"corr":json.dumps(result)})
