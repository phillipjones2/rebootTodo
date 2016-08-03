var config = {};

config.mongoURI = {
  production: 'mongodb://heroku_z9ntdjbz:lkivbkmngs0ike59c4mgb8emie@ds031845.mlab.com:31845/heroku_z9ntdjbz',
  development: 'mongodb://localhost/rebootTodo',
  test: 'mongodb://localhost/rebootTodo-Test'
};

module.exports = config;
