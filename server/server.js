const express = require('express'),
  app = express(),
  api = require('./api/api'),

      // favicon      = require('serve-favicon'),
      // babel        = require('babel-core'),
      // mongoose     = require('mongoose'),
      todos        = require('../routes/todos'),
      routes       = require('../routes/routes'),
      // fresh        = require('./routes/fresh'),
      js           = require('../routes/scripts');

require('./middleware/appMiddleware')(app);

// Set up Pug compilation.
app.set('views', `${__dirname}/../views`);
app.set('view engine', 'pug');

// ***** Need to create a favicon. ***** //
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(`${__dirname}/../public`));

app.use('/api', api);
app.use('/', todos);
app.use('/about', routes);
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
