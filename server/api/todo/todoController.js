const Todo = require('./todoModel'),
  _ = require('lodash');

// get todo if given an id
exports.params = (req, res, next, id) => {
  Todo.findById(id)
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
exports.get = (req, res, next) {
  Todo.find({})
    // .populate('User')
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
  let todo = req.todo;
  res.json(todo);
};

// update.
exports.put = (req, res, next) => {
  let todo = req.todo,
    update = req.body;
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
  let newtodo = req.body;

  Todo.create(newtodo)
    .then((todo) => {
      res.json(todo);
    }, (err) => {
      next(err);
    });
};

// delete.
exports.delete = (req, res, next) => {
  req.post.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
