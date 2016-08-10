require('colors');
const _ = require('lodash'),
  config = require('../config/config'),
  noop = () => {};
// check if loggin is enabled in the config
// if it is, then use console.log
// if not then noop
var consoleLog = config.logging ? console.log.bind(console) : noop;

var logger = {
  log: function() {
    var tag = '[ ✨  LOG ✨  ]'.green;
    // arguments is an array like object with all the passed
    // in arguments to this function
    var args = _.toArray(arguments)
      .map(function(arg) {
        if(typeof arg === 'object') {
          // turn the object to a string so we
          // can log all the properties and color it
          var string = JSON.stringify(arg, 2);
          return `${tag} ${string.cyan}`;
        } else {
          // coerce to string to color
          return `${tag} ${arg.cyan}`;
        }
      });

    // call either console.log or noop here
    // with the console object as the context
    // and the new colored args :)
    consoleLog.apply(console, args);
  },

  error: function() {
    var args = _.toArray(arguments)
      .map((arg) => {
        arg = arg.stake || arg;
        let name = arg.name || '[ ❌  ERROR ❌  ]';
        let log = `${name.yellow} ${arg.red}`;
        return log;
      });
    consoleLog.apply(console, args);
  }
};

module.exports = logger;
