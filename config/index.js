
require('./global');

const config = {
  graceful_shutdown: process.env.GRACEFUL_SHUTDOWN !== 'false',
  graceful_shutdown_ms: _.parseInt(process.env.GRACEFUL_SHUTDOWN_MS) || 3000,
  http: {
    port: _.parseInt(process.env.HTTP_PORT) || 3000,
  },
};

module.exports = config;
