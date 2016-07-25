'use strict';

const express      = require('express'),
      favicon      = require('serve-favicon'),
      logger       = require('morgan'),
      babel        = require('babel-core'),
      mongoose     = require('mongoose'),
      todoModel    = require('./modules/todoModel'),
      bodyParser   = require('body-parser'),
      todos        = require('./routes/todos').router,
      js           = require('./routes/scripts'),
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

app.use('/', todos);
app.use('/scripts', js);

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
