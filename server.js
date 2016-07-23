'use strict';

const express      = require('express'),
      path         = require('path'),
      favicon      = require('serve-favicon'),
      logger       = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser   = require('body-parser'),
      sass         = require('node-sass-middleware'),
      routes       = require('./routes/index'),
      users        = require('./routes/users'),
      server          = express();

// Set up Pug compilation.
server.set('views', `${__dirname}/views`);
server.set('view engine', 'pug');

// Set up Sass compilation.
server.use(sass({
    src: `${__dirname}/views/styles/main.scss`,
    dest: `${__dirname}/public/stylesheets`,
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/scss'  // <link rel="stylesheets" href="scss/style.css"/>
}));

// ***** Need to create a favicon. ***** //
//server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(`${__dirname}/public`));

server.use('/', routes);
server.use('/users', users);

// catch 404 and forward to error handler
server.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// Commented out until we understand them.

// development error handler
// will print stacktrace
// if (server.get('env') === 'development') {
//   server.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// server.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = server;
