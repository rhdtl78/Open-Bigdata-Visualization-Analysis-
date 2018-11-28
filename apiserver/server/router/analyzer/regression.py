import pandas as pd
from ... import firebase_init
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import numpy as np
import json
import statsmodels.formula.api as sm

@csrf_exempt
def process(request):
    db = firebase_init.db
    body = json.loads(request.body.decode('utf-8'))
    uid = body['uid']
    dependent = body['dependent']
    independent = body['independent']
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
    eval = dependent +" ~ "
    for element in independent:
        eval = eval + element +" + "
    eval = eval[:-3]

    result = sm.ols(formula = eval, data = df).fit()
    df["pred"] = result.predict()
    params = result.params
    jsonParams  = []
    for idx,element in enumerate(params):
        jsonParams.append(element)




    # return JsonResponse({"result":df.to_json(orient='records')})
    return JsonResponse({"result":df.to_json(orient='records') , "params":json.dumps(jsonParams)})
