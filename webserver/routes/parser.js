var express = require('express');
var router = express.Router();
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)

var summary = require('../lib/summary.js')
var showData = require('../lib/showData.js')
var upload = multer({
  dest: 'uploads/'
})
var request = require('request');
var database = require('../lib/DBConnecter.js');

router.post('/csv', upload.single('csvfile'), function(req, res, next) {
  var uid = req.query.uid;
  var dest = req.file.destination;
  var filename = req.file.filename;
  var fullDir = dest + filename; // 전체 경로 계산

  var db = new database(uid);
  var stream = fs.createReadStream(fullDir, {endcoding: 'utf-8'});

  var array = new Array();
  var i = 0;
  var csvStream = fastCSV({
      headers: true
    })
    .on("data", function(data) {
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key]) {
            data[key] = (isNaN(data[key])) ? data[key] : Number(data[key]);
          } else {
            data[key] = NaN;
          }
        }
      }
      array[i] = data;
      i++;
    })
    .on("end", function() {
      
      const df = new DataFrame(array);

      db.save(array);
      var data = summary(df)
      var data2 = showData(df)

      res.json({
        data: data,
        data2:data2,
        variable:df.columns
      })
    });

  stream.pipe(csvStream);

  fs.unlink(fullDir, function(err) {
    if (err) throw err;
  });

});

module.exports = router;
