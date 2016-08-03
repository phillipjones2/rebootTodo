const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Todo = require('../modules/todoModel');

var today = new Date(),
    yesterday = new Date(today.setDate(today.getDate() -1)),
    thisWeek = new Date(today.setDate(today.getDate() - 7));

// todo index - all todos cRud
router.get('/todos', (req, res) => {
  Todo.find().
            and([
              { $or: [{'completed':false },{ 'completedDate': {$gte : yesterday}}] }
            ]).
              sort('completed').
              sort('-priority').
              exec((err, docs) => {
    for (var doc of docs) {
      doc.idString = doc._id.toString();
    }
    // console.log(docs);
    res.send(docs);
  });
});

// todo show - one todo  cRud
router.get('/todos/:todo_id', (req, res) => {
  Todo.findById(req.params.todo_id, (err, todo) => {
    if (err) {
      res.sent(err)};
    res.send(todo);
  });
});

// todo create Crud
router.post('/todos', (req, res) => {
  var todo = new Todo({title: req.body.title, body: req.body.body, priority : req.body.priority});
  todo.save((err, doc) => {
    if (err) return console.log(err);
    res.send({
      msg:"create successful!",
      data:doc
    });
  });
});

// todo update  crUd
router.put('/todos/:todo_id', (req, res) => {
  Todo.findById(req.params.todo_id, (err, todo) => {
    if (err) {res.send(err)};
    todo.title = req.body.title;
    todo.body = req.body.body;
    todo.priority = req.body.priority;
    todo.save((err, doc) => {
      if (err) return console.log(err);
      res.send({
        msg: "update successful!",
        data: doc
      });
    });
  });
});

// todo delete cruD
router.delete('/todos/:todo_id', (req, res) => {
  Todo.findById(req.params.todo_id, (err, todo) => {
    Todo.remove(todo, (err) => {
      if (err) {res.send(err);}
      else {
        res.send({
          msg: "delete successful",
          data: todo
        });
      }
    });
  });
});

module.exports = router;
