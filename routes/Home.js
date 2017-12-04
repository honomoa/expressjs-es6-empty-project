'use strict';

const util = require('util');

const express = require('express');

const BasicRouter = require('lib/BasicRouter');

class HomeRouter extends BasicRouter {
  setRouter() {
    this.routerMap.addRouter('get', `/`, this.getHome);
    this.routerMap.addRouter('get', `/error`, this.getError);
    this.routerMap.addRouter('get', `/resisted`, this.getHome, this.ensureAuthorized);
    return this;
  }

  ensureAuthorized(req, res, next) {
    res.sendStatus(403);
  }

  getHome(req, res, next) {
    res.render('index', {title: 'Home'});
  }

  getError(req, res, next) {
    throw new Error('Error');
  }
}

module.exports = HomeRouter;
