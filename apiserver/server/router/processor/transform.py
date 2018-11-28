import pandas as pd
import numpy
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
    variable = body['variable']
    category = body['category']
    ref = db.reference("/" + uid + "/tmp")
    snapshot = ref.get()
    data = snapshot['data']

    dataList = []
    for key, value in data.items():
        dataList.append(value)

    df = pd.DataFrame(dataList)
    print("variable = ", variable)
    print("category = ", category)
    colName = df.columns.values.tolist()
    for idx, element in enumerate(colName):
        element = element.replace("&35;", "#")
        element = element.replace("&36;", "$")
        element = element.replace("&46;", ".")
        element = element.replace("&91;", "[")
        element = element.replace("&93;", "]")
        element = element.replace("&47;", "/")
        colName[idx] = element

    df.columns = colName
    if variable != None:
        for name in variable:
            newColName = name+"(category)"
            df[newColName] = df[name]
            for element in category:
                for idx, value in enumerate(element):
                     value = float(value)

                     if idx == 0:
                         before = value
                     else :
                         df[newColName] = np.where(df[newColName].between(before,value),before,df[newColName])
                         before = value

    if variable != None:
        for name in variable:
            newColName = name+"(category)"
            for element in category:
                for idx, value in enumerate(element):
                    newValue = name+ "_" + str(idx)
                    if idx < len(element):
                        value = float(value)
                        df[newColName] = df[newColName].replace(value,newValue)

    return JsonResponse({"snapshot": df.to_json(orient='records')})
