# -*- coding:utf-8 -*-
# -*- coding: euc-kr -*-
import numpy as np
import pandas as pd
import scipy.stats as stats
from sklearn import linear_model
from sklearn import preprocessing
import sys, json
from importlib import reload
reload(sys)
#sys.setdefaultencoding('utf-8')
sys.encoding='euc-kr'

arr =[]
df = pd.DataFrame()
for line in sys.stdin:
    df = pd.DataFrame(line)
    # arr.append(line)
    # print(json.dumps(json.loads(line)))
    # print(json.dumps(json.loads(line)))
# tempDs = df.columns
# xVar = pd.DataFrame.from_records(arr[0])
# yVar = pd.DataFrame.from_records(arr[1])
# indepDf = pd.DataFrame()
# depDf = pd.DataFrame(a)
# length = len(arr)
# number = preprocessing.LabelEncoder()
# for index in range(len(arr)-1):
#     indepDf.set(arr[index])
    # indepDf.append(arr[index],ignore_index=True)
    # indepDf[index]= pd.Series(data=arr[index],dtype=float)
    # indepDf[index]=indepDf[index].mul(10)
    # if indepDf[index].dtype == type(object):
    #     # le = LabelEncoder()
    #     indepDf[index] = number.fit_transform(indepDf[index])
    # indepDf[index] = indepDf[index].apply(lambda x: float(x.split()[0].replace(',', '')))
    # indepDf[index]= indepDf[index].astype(float)
    # indepDf[index] = number.fit_transform(indepDf[index])

# depDs = arr[len(arr)-1]
# depDs = pd.Series(data=arr[len(arr)-1],dtype=float)
# depDs = depDs.mul(10)
# depDs = number.fit_transform(depDs)

# temp1 = pd.Series(number.fit_transform(depDs))

# depDs = depDs.apply(lambda x: float(x.split()[0].replace(',', '')))
# depDs = depDs.astype(float)
# depDs.astype(float)
# depDf.append(arr[len(arr)-1],ignore_index=True)

# xVar = arr[0]
# yVar = arr[1]

# lm = linear_model.LinearRegression()
# model = lm.fit(indepDf,depDs)
# predictions = lm.predict(indepDf)
# lm = linear_model.LinearRegression()
# model = lm.fit(df,tempDs)
# predictions = lm.predict(df)

# temp = pd.Series(predictions)
# predictions = predictions.astype(np.string)
# xVarJ = indepDf.to_json(orient='records')
# yVarJ = depDs.to_json(orient='records')
# xVar.head()
# yVar.head()
# print(json.dumps(json.loads(xVarJ)))
# print(json.dumps(json.loads(yVarJ)))
# print(json.dumps(json.loads(temp.to_json(orient='records'))))
# print(json.dumps(json.loads(df)))
# print(json.dumps(json.loads(tempDf)))