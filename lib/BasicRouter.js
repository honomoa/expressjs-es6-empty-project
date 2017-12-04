'use strict';

const util = require('util');

const express = require('express');
const cors = require('cors');

const RouterMap = require('lib/RouterMap');

class BasicRouter {
  constructor(app, basicPath) {
    this.app = app;
    this.routerMap = new RouterMap();
    this.basicPath = basicPath;
    this.setRouter();
    this.bindRouter();
    return this;
  }

  bindRouter() {
    let routers = this.routerMap.getRouters();
    let expressRouter = express.Router();

    _.forEach(routers, router => {
      if (router.protect) {
        expressRouter[router.method](router.path, router.protect.bind(this), router.func.bind(this));
      } else {
        expressRouter[router.method](router.path, router.func.bind(this));
      }
    });

    this.app.use(this.basicPath, expressRouter);
    return this;
  }

  setRouter() {
    throw new Error('Need Implement');
  }

  ensureAuthorized(req, res, next) {
    MoaLog.warn('You should implement your own ensureAuthorized!');
    next();
  }
}

module.exports = BasicRouter;
