const os = require('os');
const fs = require('fs');
const monitor = require('pg-monitor');

monitor.setTheme('matrix'); // changing the default theme;

// Flag to indicate whether we are in a DEV environment:
const $DEV = process.env.NODE_ENV === 'development';

// Log file for database-related errors:
const logFile = './errors.log';

// see: https://github.com/vitaly-t/pg-monitor#log
monitor.setLog((msg, info) => {

  // In a PROD environment we will only receive event 'error'

  if (info.event === 'error') {
    let logText = os.EOL + msg; // line break + next error message;
    if (info.time) {
        // If it is a new error being reported,
        // and not an additional error line;
        logText = os.EOL + logText; // add another line break in front;
    }
    fs.appendFileSync(logFile, logText); // add error handling as required;
  }

  // Write nothing to console in production
  if (!$DEV) {
    // If it is not a DEV environment:
    info.display = false; // display nothing;
  }

});

module.exports = {
  // Monitor initialization function;
  init(options) {
    if ($DEV) {
        // In a DEV environment, we attach to all supported events:
        monitor.attach(options);
    } else {
        // In a PROD environment we should only attach to the type of events
        // that we intend to log. And we are only logging event 'error' here:
        monitor.attach(options, ['error']);
    }
  }
};