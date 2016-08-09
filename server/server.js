const express = require('express'),
  app = express(),
  api = require('./api/api'),
  todos = require('../routes/todos'),
  routes = require('../routes/routes'),
  js = require('../routes/scripts');

  // fresh        = require('./routes/fresh'),
  // babel        = require('babel-core'),
  // mongoose     = require('mongoose'),

require('./middleware/appMiddleware')(app);

app.use('/api', api);

// fix these: static routes...????
app.use('/', todos);
app.use('/about', routes);
//*******************************

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
    console.log(err.message);
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
