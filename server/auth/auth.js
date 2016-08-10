const jwt = require('jsonwebtoken'),
  expressJwt = require('express-jwt'),
  config = require('../config/config'),
  checkToken = expressJwt({ secret: config.secrets.jwt}),
  User = require('../api/user/userModel');

exports.decodeToken = () => {
  return (req, res, next) => {
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = `Bearer ${req.query.access_token}`;
    }
    checkToken(req, res, next);
  };
};

exports.getFreshUser = () => {
  return (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        if (!user) {
          res.status(401).send('Unauthorized');
        } else {
          req.user = user;
          next();
        }
      }, (err) => {
        next(err);
      });
  };
};

exports.verifyUser = () => {
  return (req, res, next) => {
    let username = req.body.username,
      password = req.body.password;
    if (!username || !password) {
      res.status(400).send('You need a username and password');
      return;
    }
    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          res.status(401).send('No user with the given username');
        } else {

          if (!user.authenticate(password)) {
            res.status(401).send('Wrong password');
          } else {
            req.user = user;
            next();
          }
        }
      }, (err) => {
        next(err);
      });
  };
};

exports.signToken = (id) => {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresInMinutes: config.expireTime}
  );
};
