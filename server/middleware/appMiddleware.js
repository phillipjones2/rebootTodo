const morgan = require('morgan'),
  bodyParser   = require('body-parser'),
  express = require('express');
// favicon      = require('serve-favicon'),

module.exports = (app) => {

  // Set up Pug compilation.
  app.set('views', `${__dirname}/../../views`);
  app.set('view engine', 'pug');

  // ***** Need to create a favicon. ***** //
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(express.static(`${__dirname}/../../public`));

};
