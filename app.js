'use strict';

const path = require('path');

const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const nunjucks = require('nunjucks');

const routes = require('routes');

function App() {
  let app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan(function customized(tokens, req, res) {
      let status = tokens.status(req, res);
      let responseTime = tokens['response-time'](req, res);
      return L.info([
        tokens['remote-addr'](req, res),
        // '-',
        // tokens['remote-user'](req, res) || '-',
        // `[${tokens['date'](req, res, 'clf')}]`,
        tokens.method(req, res),
        tokens.url(req, res),
        // `HTTP/${tokens['http-version'](req, res)}`,
        status === '200' ? chalk.green(status) : chalk.red(status),
        tokens.res(req, res, 'content-length'),
        // '-',
        responseTime < 1000 ? chalk.green(responseTime) : chalk.yellow(responseTime), 'ms',
      ].join(' '));
    }));
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.raw());
  app.use(bodyParser.text());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  // reverse proxy setup
  app.enable('trust proxy');
  // app.set('trust proxy', []);

  // response header setup
  // app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.header('X-Powered-By', 'Moa');
    next();
  });

  // view engine setup
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, 'views'));
  nunjucks.configure(app.get('views'), {
    autoescape: true,
    express: app,
    watch: true
  });

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));

  // router setup
  app.use('/', routes.Home());
  app.use('/', routes.metrics());
  app.use('/', routes.lolhelper());

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers
  if (process.env.NODE_ENV === 'development') {
    // development error handler
    // will print stacktrace
    app.use((err, req, res) => {
      res.status(err.status || 500);
      res.render('error.html', {
        message: err.message,
        error: err,
      });
    });
  } else {
  // production error handler
  // no stacktraces leaked to user
    app.use((err, req, res) => {
      res.status(err.status || 500);
      res.render('error.html', {
        message: err.message,
        error: {},
      });
    });
  }
  return app;
}

module.exports = App;
