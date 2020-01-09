
const http = require('http');

const chalk = require('chalk');

const config = require('./config');
const app = require('./app');

let application = app();
let server;

try {
  application.set('isReady', false);
  server = http.createServer(application).listen(config.http.port, () => {
    L.info('New server has been start at port ' + chalk.red(config.http.port));
    application.set('isReady', true);
  });
} catch (err) {
  L.error('catch error: %s', err);
}

process.on('SIGTERM', () => {
  L.info('received SIGTERM');
  stop();
});

process.on('SIGINT', () => {
  L.info('received SIGINT');
  stop();
});

function stop() {
  application.set('isReady', false);
  if (process.env.NODE_ENV === 'development' || !config.graceful_shutdown) {
    process.exit(0);
  } else {
    server.close(() => {
      L.info('Exiting after 5 seconds.');
      setTimeout(() => {
        process.exit(0);
      }, config.graceful_shutdown_ms);
    });
  }
}

process.on('unhandledRejection', (reason) => {
  L.crit(reason);
});
