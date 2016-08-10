const User = require('./userModel'),
  _ = require('lodash'),
  signToken = require('../../auth/auth').signToken;

// get user if given an id
exports.params = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        next (new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, (err) => {
      next(err);
    });
};

// index. All users
exports.get = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.json(users);
    }, (err) => {
      next(err);
    });
};

// show. One user
exports.getOne = (req, res, next) => {
  var user = req.user;
  res.json(user);
};

// update. a user
exports.put = (req, res, next) => {
  var user = req.user,
    update = req.body;
  _.merge(user, update);

  user.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

//create. a user
exports.post = function(req, res, next) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if(err) { return next(err);}
    var token = signToken(user._id);
    res.json({token: token});
  });
};

//delete. a user
exports.delete = (req, res, next) => {
  req.user.remove((err,removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
