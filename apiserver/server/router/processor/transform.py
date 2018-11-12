import pandas as pd
import numpy
from ... import firebase_init
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def process(request):
    print("ami wered")
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

    # print("colName =  ",colName)
    df.columns = colName
    # for idx, element in enumerate(seqNames):
    #     postData.columns.values[idx] = element
    print("am I here")

    if variable != None:
        for name in variable:
            for idx, element in enumerate(category):
                temp = element[idx]
                if idx == 0:
                    df[name] = df[name].mask(df[name] > temp, name+"_"+idx)
                elif idx == (len(variable)-1):
                    df[name] = df[name].mask(df[name] < temp, name+"_"+idx)
                else :
                    before = element[idx-1]
                    df[name] = np.where(df[name].between(before,temp), name+"_"+idx, df[name])



    return JsonResponse({"snapshot": df.to_json(orient='records')})
