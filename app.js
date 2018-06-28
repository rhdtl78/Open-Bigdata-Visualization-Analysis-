var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var admin = require('firebase-admin');
var firebase = require('firebase');
var parser = require('./routes/parser');
var fastCSV = require('fast-csv');
var serviceAccount = require("./serviceAccount.json");
var appAccount = require("./firebase-credit.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "obva1234.appspot.com",
  databaseURL: "https://obva1234.firebaseio.com"
});

storage = admin.storage();
var remoteFile = storage.bucket('/csv').file('iris.csv');
var stream = remoteFile.createReadStream();
var localFilename="./csv/iris.csv";

console.log(remoteFile);

remoteFile.createReadStream()
  .on('error', function(err) {})
  .on('response', function(response) {
    // Server connected and responded with the specified status and headers.
   })
  .on('end', function() {
    // The file is fully downloaded.
    console.log("down done");
  })
  .pipe(fs.createWriteStream(localFilename)).on("end", function(){
    var localStream = fs.createReadStream(localFilename);
    var csvStream = fastCSV()
        .on("data", function(data){
             console.log(data);
        })
        .on("end", function(){
             console.log("done");
        });

    localStream.pipe(csvStream);
  });




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/parse', parser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
