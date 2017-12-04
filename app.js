'use strict';

const path = require('path');

const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const routes = require('routes');

const app = express();

// view engine setup
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
nunjucks.configure(app.get('views'), {
   autoescape: true,
   express: app,
   watch: true
});

// reverse proxy setup
// app.set('trust proxy', []);

// response header setup
app.disable('x-powered-by');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.set('env', process.env.NODE_ENV || 'development');

if (app.get('env') === 'development') {
  app.use(logger('dev'));
} else {
// app.use(logger('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router setup
new routes.Home(app, '/');

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

if (app.get('env') === 'development') {
  // development error handler
  // will print stacktrace
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: {}
    });
  });
}

module.exports = app;
