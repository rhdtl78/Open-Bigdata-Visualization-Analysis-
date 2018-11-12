var express = require('express');
var router = express.Router();
var summary = require('../lib/summary.js')
var showData = require('../lib/showData.js')
var database = require('../lib/DBConnecter.js');

// router.get('/', function (req, res, next) {
//   var variable = req.query.variable;
//   var category = req.query.category;
//   var uid = req.query.uid;
//
//   const db = new database(uid);
//   db.load('tmp', function (data) {
//
//     var df = new DataFrame(data)
//     variable.forEach(function (element, index) {
//       transDf = df.get(element);
//       let transArray = new Array();
//       var temp = category[index];
//       var temp2 = new Array();
//       for(i=0;i<5;i++){
//         if(i<temp.length){
//           temp2.push(temp[i])
//         }else{
//           temp2.push(10000000000000000)
//         }
//       }
//       transDf.forEach(function(current) {
//           let name = null;
//           if (temp2[0] <= current && current < temp[1]) {
//             name = element +"_A"
//             transArray.push(name)
//           } else if(temp2[1] <= current && current < temp[2]){
//             name = element +"_B"
//             transArray.push(name)
//           } else if(temp2[2] <= current && current < temp[3]){
//             name = element +"_C"
//             transArray.push(name)
//           } else if(temp2[3] <= current && current < temp[4]){
//             name = element +"_D"
//             transArray.push(name)
//           } else{
//             transArray.push("")
//           }
//
//       })
//         df = df.set(element, transArray);
//     })
//     db.save(df.to_json({ orient: 'records' }))
//     var data = summary(df);
//     var data2 = showData(df)
//     res.json({
//       data: data,
//       data2:data2,
//       variable:df.columns
//     })
//   })
// });

router.post("/", (req, res) => {

  // const user_id = req.body.uid;
  // const minArray = req.body.minArray;
  // const maxArray = req.body.maxArray;
  // const variableArray = req.body.variableArray;
  // const db = new database(user_id);

  var variable = req.body.variable;
  var category = req.body.category;
  var uid = req.body.uid;
  const db = new database(uid);
  console.log("it is okay")
  axios({
    url: "http://localhost:8000/server/transform",
    data: {
      uid: uid,
      variable: variable,
      category: category.map(value => {
        return parseFloat(value);
      })
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
