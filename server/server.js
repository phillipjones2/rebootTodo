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

// error handling
require('./middleware/err')(app);

module.exports = app;
