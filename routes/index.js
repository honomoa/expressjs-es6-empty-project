
/*
 * Load all routes.
 */

const fs = require('fs');
const routes = {};

fs.readdirSync(__dirname).filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.lastIndexOf('.js') === file.length - 3);
}).forEach((file) => {
  L.debug(file)
  let filename = file.split('.')[0];
  routes[filename] = require(`./${file}`);
});

module.exports = routes;
