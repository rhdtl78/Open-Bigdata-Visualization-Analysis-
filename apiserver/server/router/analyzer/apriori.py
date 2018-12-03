import pandas as pd
from ... import firebase_init
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import numpy as np
import json
# from apyori import apriori
from efficient_apriori import apriori

@csrf_exempt
def process(request):
    db = firebase_init.db
    body = json.loads(request.body.decode('utf-8'))
    uid = body['uid']
    select = body['select']
    support = body['support']
    confidence = body['confidence']
    ref = db.reference("/" + uid + "/tmp")
    snapshot = ref.get()
    data = snapshot['data']

    dataList = []
    for key, value in data.items():
        dataList.append(value)

    # print(dataList)
    df = pd.DataFrame(dataList)
    # print("select = ", select)
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

    apr = []
    newDf = pd.DataFrame()
    for idx,element in enumerate(select):
        print(element)
        # temp = array()
        # temp = df[element].to_json(orient='records')
        # apr.append(tuple(temp))
        # apr.append(df[element].to_json(orient='records'))
        newDf[element] = df[element]
    apr = newDf.to_records()
    # tuple(apr)
    # print(apr)
    # print("support = ",support)
    # print("confidence = ",confidence)
    itemsets, rules = apriori(apr, min_support=float(support),  min_confidence=float(confidence))
    # print(rules)
    jsonRules  = []
    temp =""
    for element in rules:
        temp = str(element)
        # print("temp = ",temp)
        # print("element = ",element)
        jsonRules.append(temp)
    # print(jsonRules)
    # jsonRules = json.dumps(jsonRules)
    # print(apriori(apr))
    # print(results)
    # print(json.dumps(results))
    return JsonResponse({"rules":json.dumps(jsonRules)})
