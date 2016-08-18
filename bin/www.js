#!/usr/bin/env node
const mongoose = require('mongoose'),
  config = require('../server/config/config'),
  app = require('../server/server'),
  logger = require('../server/util/logger');

/**
 * Module dependencies.
 */

var debug = require('debug')('todoreboot:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(config.port || '3000');
app.set('port', port);


/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  logger.log(`listening on http://localhost:${port}  Environment: ${config.env.green}`);
  mongooseConnection();
}

// mongoose
function mongooseConnection() {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongoURI, (err, res) => {
    if (err) {
      logger.log('Error connecting to the database. ' + err);
    } else {
      logger.log('Connected to Database: ' + config.mongoURI);
    }
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    // console.log('We Are connected to MongoDB');
  });
}

module.exports = server;
