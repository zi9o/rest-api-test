const winston = require('winston');

// instantiate a new Winston Logger with file and console settings
const logger = new winston.createLogger({
  transports: [
    // Ability to add different loggers other than console
    new winston.transports.Console({
      level: 'error',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;
