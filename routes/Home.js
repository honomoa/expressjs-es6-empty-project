
const express = require('express');

const RouteUtil = require('../lib/RouteUtil');

module.exports = HomeRouter;

function HomeRouter() {
  let routeUtil = new RouteUtil();

  // Add routers
  routeUtil.addRouter('get', '/', getHome);
  routeUtil.addRouter('get', '/error', getError);
  routeUtil.addRouter('get', '/restricted', getHome, ensureAuthorized);

  // Bind router
  let expressRouter = express.Router({ mergeParams: true });
  routeUtil.binding(expressRouter);

  return expressRouter;
}

function getHome(req, res, next) {
  res.render('index', { title: 'Home' });
}

function getError(req, res, next) {
  throw new Error('Error');
}

function ensureAuthorized(req, res, next) {
  if (false) {
    next();
  } else {
    if (process.env.NODE_ENV === 'development') {
      next();
    } else {
      res.sendStatus(403);
    }
  }
}
