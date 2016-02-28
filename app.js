var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var sassMiddleware = require('node-sass-middleware');
var subdomain = require('express-subdomain');
var passport = require('passport');
var passportLocal = require('passport-local');

mongoose.connect('mongodb://localhost/seojinlee');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret:'secret',
  resave: false,
  saveUninitialized: false
}));
//Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(
  sassMiddleware({
    src: path.join(__dirname, '/public/stylesheets/sass'),
    dest: path.join(__dirname, '/public/stylesheets'),
    prefix: '/stylesheets',
    debug: true
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


// routes directory
require('./models/models');
var index = require('./routes/index');
var blog = require('./routes/blog')(passport);
var api = require('./routes/api');

app.use(subdomain('blog', blog));
app.use('/', index);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
