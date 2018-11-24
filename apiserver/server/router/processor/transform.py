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

    # print(dataList)
    df = pd.DataFrame(dataList)
    print("variable = ", variable)
    print("category = ", category)
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
    # print("길이는 = ",len(variable))
    if variable != None:
        for name in variable:
            # newColName = name+"(category)"
            # for check in colName:
            #     if newColName == check:
            #         new ColName =
            newColName = name+"(category)"
            # print("name = ", name)
            # print("neweColName = " ,newColName)
            df[newColName] = df[name]
            for element in category:
                # print("element  = ",element)
                # print("name = ",name)
                for idx, value in enumerate(element):
                #print("loop " ,temp)
                     value = float(value)
                     # print(idx)

                    # print("value = ",type(value))
                    # print(df.dtypes)
                    # df[name] = df[name].astype('str')
                    # print(df.dtypes)

                    # df[name] = df[name].mask(df[name] > value, value)

                    # df = df[df.get(name).mask(name>value,newValue)]
                     # = df[df.get(name).mask(name>value,newValue)]

                    # df[name] = df[name].astype('str')
                    # df[name] = df[name].replace(value,newValue)
                    # print("new name = ",newValue)
                     # print(len(variable)-1)
                     # if idx <= (len(element)-1):
                     # df[newColName] = df[name].mask(df[name]>value & df[before], newValue)
                     # if idx ==0:
                     #     before = value
                     # else :
                     #
                     #    df[newColName] = df[name].mask(df[name]>before and df[name]<value, newValue)
                     # print(df)

                     if idx == 0:
                         #df[name] = df[name].mask(df[name] < value, value)
                         before = value
                     else :
                         # print("before = ",before)
                         df[newColName] = np.where(df[newColName].between(before,value),before,df[newColName])
                         before = value
                # df[newColName]  = df[newColName].astype('object')
                # df[newColName]  = df[newColName].astype('object')
            # print("newcolname type = ",df[newColName].dtype)
            # for idx, value in enumerate(element):
            #     newValue = name+ "_" + str(idx)
            #
            #     if idx < len(element):
            #             # print("newValue = ",newValue)
            #             # print("value = ",value)
            #         value = float(value)
            #             # if df[newColName].dtype != "object" :
            #             #     value = float(value)
            #             # else :
            #             #     value = str(value)
            #             # print(df[newColName].dtype)
            #             # print(type(value))
            #             # print("float value = ",value)
            #             # print(df[newColName].replace(value,newValue))
            #             # print("value = ",value)
            #             # print("newValue = ",newValue)
            #             # print(df[newColName].replace(value,newValue))
            #         df[newColName] = df[newColName].replace(value,newValue)
                        # print(df[newColName])
    # print(df)
    if variable != None:
        for name in variable:
            # newColName = name+"(category)"
            # for check in colName:
            #     if newColName == check:
            #         new ColName =
            newColName = name+"(category)"
            # print("name = ", name)
            # print("neweColName = " ,newColName)
            for element in category:
                for idx, value in enumerate(element):
                    newValue = name+ "_" + str(idx)

                    if idx < len(element):
                            # print("newValue = ",newValue)
                            # print("value = ",value)
                        value = float(value)
                            # if df[newColName].dtype != "object" :
                            #     value = float(value)
                            # else :
                            #     value = str(value)
                            # print(df[newColName].dtype)
                            # print(type(value))
                            # print("float value = ",value)
                            # print(df[newColName].replace(value,newValue))
                            # print("value = ",value)
                            # print("newValue = ",newValue)
                            # print(df[newColName].replace(value,newValue))
                        df[newColName] = df[newColName].replace(value,newValue)

    return JsonResponse({"snapshot": df.to_json(orient='records')})
