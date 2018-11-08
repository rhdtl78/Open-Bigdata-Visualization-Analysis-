var express = require("express");
var router = express.Router();
var summary = require("../lib/summary.js");
var showData = require("../lib/showData.js");
var database = require("../lib/DBConnecter.js");
const axios = require("axios");

// router.get("/", function(req, res, next) {
//   var minArray = req.query.minArray;
//   var maxArray = req.query.maxArray;
//   var seqNames = req.query.variableArray;
//   var variable = new Array();
//   seqNames.forEach(function(element) {
//     if (element != "") {
//       variable.push(element);
//     }
//   });
//   var uid = req.query.uid;
//   const db = new database(uid);
//   db.load("tmp", function(data) {
//     df = new DataFrame(data);
//     if (minArray != null) {
//       minArray.forEach(function(element, index) {
//         if (element != "") {
//           df = df.filter(df.get(variable[index]).gt(element));
//         }
//       });
//     }
//     if (maxArray != null) {
//       maxArray.forEach(function(element, index) {
//         if (element != "") {
//           df = df.filter(df.get(variable[index]).lt(element));
//         }
//       });
//     }
//     db.save(df.to_json({ orient: "records" }));

//     var data = summary(df);
//     var data2 = showData(df);

//     res.json({ data: data, data2: data2, variable: df.columns });
//   });
// });

router.get("/modal", function(req, res, next) {
  var uid = req.query.uid;
  // console.log("uid = "+uid)
  const db = new database(uid);
  db.load("tmp", function(data) {
    df = new DataFrame(data);
    seqNames = df.columns;
    // console.log("seq: ", seqNames);
    // console.log("df: ", df);
    
    var variable = new Array();
    var data = new Array();
    seqNames.forEach(function(element) {
      if (
        // df.get(element).dtype.toString() == "dtype(int)" ||
        // df.get(element).dtype.toString() == "dtype(float)"
        true
      ) {
        variable.push(element);
        data.push(df.get(element).to_json({ orient: "records"}));
      }
    });
    
    res.json({ variable: variable, data: data });
  });
});

router.post("/", (req, res) => {

  const user_id = req.body.uid;
  const minArray = req.body.minArray;
  const maxArray = req.body.maxArray;
  const variableArray = req.body.variableArray;
  const db = new database(user_id);
  axios({
    url: "http://localhost:8000/server/outlier",
    data: {
      uid: user_id,
      minArray: minArray.map(value => {
        return parseFloat(value);
      }),
      maxArray: maxArray.map(value => {
        return parseFloat(value);
      }),
      variableArray: variableArray
    },
    method: "POST",
    headers: { "Content-type": "application/json" }
  })
    .then(response => {
      try {
        const data = JSON.parse(response.data.snapshot);
        db.save(data)
        const df = new DataFrame(data);
        // console.log(df);

        const data1 = summary(df);
        const data2 = showData(df);
        
        res.send({ data: data1, data2: data2, variable: df.columns });
      } catch (error) {
        console.log(error);
        
      }
      
    })
    .catch(error => {
      console.log("error", error);
    });
});

module.exports = router;
