'use strict';

const fs = require('fs');

const routes = {};

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.lastIndexOf('.js') === file.length - 3);
}).forEach(file => {
  MoaLog.debug(file);
  let [filename, ext] = file.split('.');
  MoaLog.debug(filename, ext);
  routes[filename] = require(`./${file}`);
});

module.exports = routes;
