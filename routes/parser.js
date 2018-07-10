var express = require('express');
var router = express.Router();
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)

var dataSum = require('./dataSummary')
var upload = multer({
    dest: 'uploads/'
  })
  var request = require('request');
  var database = require('./transaction.js');
  
router.post('/csv', upload.single('csvfile'), function (req, res, next) {
  var uid = req.query.uid;
  var dest = req.file.destination;
  var filename = req.file.filename;
  var fullDir = dest + filename; // 전체 경로 계산

  var db = new database(uid);
  var stream = fs.createReadStream(fullDir);

  var array = new Array();
  var i = 0;
  var i = 0;
  var csvStream = fastCSV({
    headers: true
  })
    .on("data", function (data) {  
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = (isNaN(data[key])) ? data[key] : Number(data[key]);
        }
      }
      array[i] = data;
      i++;
    })
    .on("end", function () {
      const df = new DataFrame(array);
      db.save(array);
      dataframe = df.copy()
      var data = dataSum.dataSummary(df)
      res.json({ data: data })
    });

  stream.pipe(csvStream);

  fs.unlink(fullDir, function (err) {
    if (err) throw err;
  });

});

module.exports = router;