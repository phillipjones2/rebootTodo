'use strict';

const express      = require('express'),
      // Serves a favicon.ico file.
      favicon      = require('serve-favicon'),
      // Morgan logs out HTTP requests.
      logger       = require('morgan'),
      bodyParser   = require('body-parser'),
      routes       = require('./routes/routes'),
      users        = require('./routes/users'),
      app          = express();

// Set up Pug compilation.
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// ***** Need to create a favicon. ***** //
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // ???
app.use(express.static(`${__dirname}/public`));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// Commented out until we understand them.

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
