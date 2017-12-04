'use strict';

const http = require('http');

require('global');
const app = require('app');

let server;
let port = process.env.HTTP_PORT || 3000;

try {
  server = http.createServer(app).listen(port, () => {
    MoaLog.info('New server has been start at port ' + (port + '').red);
  });
} catch (err) {
  MoaLog.error('catch error: %s', err);
}

if (process.env.GRACEFUL_SHUTDOWN) {
  process.on('SIGTERM', () => {
    MoaLog.info('received SIGTERM');
    stop();
  });
  
  process.on('SIGINT', () => {
    MoaLog.info('received SIGINT');
    stop();
  });
  
  function stop() {
    server.close(() => {
      MoaLog.info('Exiting after 5 seconds.');
      setTimeout(() => {
        process.exit(0);
      }, process.env.GRACEFUL_SHUTDOWN_DELAY || 5000);
    });
  }
  
}