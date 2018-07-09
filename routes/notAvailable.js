var express = require('express');
var router = express.Router();
var dataSum = require('./dataSummary')

router.get('/', function (req, res, next) {

    var variable = req.query.variable;
    var process = req.query.process;

    df = new DataFrame();
    df = dataframe.copy();

    variable.forEach(function (element, index) {
        naDf = df.get(element);
        var naArray = new Array();

        if (process[index] == "mean") {
            meanDf = df.get(element)
            avg = meanDf.mean();
            naDf.forEach(function (current) { if (current == '') { naArray.push(avg) } else { naArray.push(current) }; })
            df = df.set(element, naArray);
        } else if (process[index] == "median") {
            medianDf = df.get(element)
            middle = medianDf.median();
            naDf.forEach(function (current) { if (current == '') { naArray.push(middle) } else { naArray.push(current) }; })
            df = df.set(element, naArray);
        }
    })

    variable.forEach(function (element, index) {
        var reDf = df.get(element);
        var reArray = new Array();
        if (process[index] == "remove") {
            reDf.forEach(function (current) { if (current == '') { reArray.push(false) } else { reArray.push(true) }; })
            df = df.filter(reArray)
        }
    })
    dataframe = df.copy();
    var data = dataSum.dataSummary(df)
    res.json({ data: data })
});






module.exports = router;