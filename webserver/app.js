var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
fs = require('fs');
//const storage = require('@google-cloud/storage')();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var firebase = require('firebase');
var parser = require('./routes/parser');
var outlier = require('./routes/outlier');
var corr = require('./routes/correlation')
var cov = require('./routes/covariance')
var graph = require('./routes/graph')
var stratification = require('./routes/stratification')
var notAvailable = require('./routes/notAvailable')
var dbTransaction = require('./routes/dbTransaction');
var manual = require('./routes/manual.js');
var regression = require('./routes/regression.js');
var apriori = require('./routes/apriori.js');
var removeCol = require('./routes/removeCol.js');
var ANOVA = require('./routes/ANOVA.js');
var derived = require('./routes/derived.js');
var transform = require('./routes/transform.js');

var djangotest = require('./routes/djangotest.js');
plotly = require('plotly')("dongdong9335", "L4BOh9JUAoM30nRrLeIy")
fastCSV = require('fast-csv');
pandas = require('pandas-js');
DataFrame = require('pandas-js').DataFrame
Series =require('pandas-js').Series
map =require('pandas-js').map
immutable = require('immutable');
var serviceAccount = require("./serviceAccount.json");
var appAccount = require("./firebase-credit.json");
var bodyParser = require('body-parser');

PythonShell = require('python-shell');

var app = express();


// parse application/json
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}))
app.use(bodyParser.json({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}))


app.set('fastCSV', fastCSV);
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
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/parse', parser);
app.use('/outlier', outlier);
app.use('/correlation', corr);
app.use('/covariance', cov);
app.use('/graph', graph);
app.use('/stratification', stratification);
app.use('/notAvailable', notAvailable);
app.use('/db', dbTransaction);
app.use('/manual', manual);
app.use('/regression', regression);
app.use('/apriori', apriori);
app.use('/removeCol', removeCol);
app.use('/ANOVA', ANOVA);
app.use('/derived', derived);
app.use('/transform', transform);
app.use('/djangotest', djangotest);
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
