import pandas as pd
import numpy


class Coder:
    def __init__(self):
        self.escapeList = []
        # self.escape = {
        #     "&35;": "#",
        #     "&36;": "$",
        #     "&46;": ".",
        #     "&91;": "[",
        #     "&93;": "]",
        #     "&47;": "/",
        #     "#": "&35;",
        #     "$": "&36;",
        #     ".": "&46;",
        #     "[": "&91;",
        #     "]": "&93;",
        #     "/": "&47;"
        # }

    def escape(self, data):
        dataList = []
        for value in data.values():
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

        return postData
