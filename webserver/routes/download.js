var fs = require('fs');
var express = require('express');
var router = express.Router();
var summary = require("../lib/summary.js");
var showData = require("../lib/showData.js");
var database = require("../lib/DBConnecter.js");
const mime = require('mime');
const path = require('path');

router.get('/', function(req, res, next) {

    var uid = req.query.uid;

    const db = new database(uid);
    db.load("tmp", function(data) {
        df = new DataFrame(data);
        var data = df.to_csv();
        var filepath = 'temp/csv_temp.csv';
        fs.writeFileSync(filepath, data, 'utf-8', function(err){
            if(err){
                // 3. 파일생성 중 오류가 발생하면 오류출력
                console.log(e);
            }else{
                // 4. 파일생성 중 오류가 없으면 완료 문자열 출력
                console.log('WRITE DONE!');
            }
        });

        var filename = path.basename(filepath);
        var mimetype = mime.getType(filepath);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(filepath);
        filestream.pipe(res).on('finish', () => {
          try {
            fs.unlinkSync(filepath, (err) => {
              if (err) throw err;
            });
            res.end()
          } catch (e) {
            console.log(e);
          }
        })
    })
});


module.exports = router;
