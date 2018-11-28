import pandas as pd
from ... import firebase_init
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import numpy as np
import json
from statsmodels.formula.api import ols
from statsmodels.stats.anova import anova_lm

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
        # print("select = ", dependent)
        # print("indepdnt = ", independent)
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

        formula = 'head_size ~ C(fetus) + C(observer) + C(fetus):C(observer)'
        formula = dependent + " ~ "
        for element in independent:
            formula += "C(" + element+ ") + "
        formula = formula[:-2]
        # for element in independent:
        #     formula += "C(" + element+ "):"
        # formula = formula[:-1]
        # print("formula =",formula)
        lm = ols(formula, df).fit()
        # print(anova_lm(lm))
        result = anova_lm(lm)
        records = result.to_records()
        temp =[]
        for element in records:
            # print("element = ",element)
            temp.append(str(element))

        return JsonResponse({"result":json.dumps(temp)})
