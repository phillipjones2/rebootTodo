'use strict';

const UniversalTodo = require('./universalTodoModel'),
  _ = require('lodash'),
  formatDate = require('../../util/formatDate'),
  logger = require('../../util/logger');

var today = new Date(),
    yesterday = new Date(today.setDate(today.getDate() -1)),
    thisWeek = new Date(today.setDate(today.getDate() - 7));

// get todo if given an id
exports.params = (req, res, next, id) => {
  UniversalTodo.findById(id)
    .then((todo) => {
      if (!todo) {
        next (new Error('No todo with that id'));
      } else {
        req.todo = todo;
        next();
      }
    }, (err) => {
      next(err);
    });
};

// index.  ALL todos
exports.get = (req, res, next) => {
  UniversalTodo.find({})
    .and([
      { $or: [{'completed':false },
      { 'completedDate': {$gte : yesterday}}] }
      ])
    .sort('completed')
    .sort('-priority')
    .exec()
    .then((todos) => {
      for (var todo of todos) {
        todo.idString = todo._id.toString();
      }
    res.json(todos);
  }, (err) => {
    next(err);
  });
};

// show. One todo
exports.getOne = (req, res, next) => {
  var todo = req.todo;
  res.json(todo);
};

// update.
exports.put = (req, res, next) => {
  var todo = req.todo,
    update = req.body;
    logger.log(update);
    update.formattedUpdate = formatDate.formatDate(new Date());
    if (update.completed){
      update.completed = true;
      update.completedDate = new Date();
    } else {
      update.completed = false;
    }
    _.merge(todo,update);
    todo.save((err,saved) => {
      if (err) {
        next(err);
      } else {
        res.json(saved);
      }
    });
};

// create.
exports.post = (req, res, next) => {
  if(!req.user){
    let newtodo = req.body;
    newtodo.formattedCreate = formatDate.formatDate(new Date());
    newtodo.formattedUpdate = formatDate.formatDate(new Date());
    UniversalTodo.create(newtodo)
      .then((todo) => {
        res.json(todo);
      }, (err) => {
        next(err);
      });
  } else {
    req.body.user = req.user._id;
    newtodo = req.body;
    newtodo.formattedCreate = formatDate.formatDate(new Date());
    newtodo.formattedUpdate = formatDate.formatDate(new Date());
    UniversalTodo.create(newtodo)
      .then((todo) => {
        res.json(todo);
      }, (err) => {
        next(err);
      });
  }
};

// delete.
exports.delete = (req, res, next) => {
  req.todo.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
