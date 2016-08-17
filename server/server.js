const express = require('express'),
  app = express(),
  login = require('../routes/login'),
  api = require('./api/api'),
  todos = require('../routes/todos'),
  routes = require('../routes/routes'),
  js = require('../routes/scripts'),
  auth = require('./auth/routes'),
  logger = require('./util/logger');

  // fresh        = require('./routes/fresh'),
  // babel        = require('babel-core'),
  // mongoose     = require('mongoose'),

require('./middleware/appMiddleware')(app);
app.use('/api', api);
app.use('/auth', auth);

// fix these: static routes...????
app.use('/login', login);
app.use('/', todos);
app.use('/about', routes);
//*******************************

app.use('/scripts', js);

// app.use((err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401).send('Invalid token');
//     return;
//   }
//   logger.error(err.stack);
//   res.status(500).send('Oops');
// });

// error handling
require('./middleware/err')(app);

module.exports = app;
