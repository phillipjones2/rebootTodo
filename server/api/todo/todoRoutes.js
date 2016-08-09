const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Todo = require('./todoModel'),
  formatDate = require('../../util/formatDate');

var today = new Date(),
    yesterday = new Date(today.setDate(today.getDate() -1)),
    thisWeek = new Date(today.setDate(today.getDate() - 7));

router.route('/')
  // todo index - all todos cRud
  .get((req, res) => {
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
      res.send(docs);
    });
  })
  // todo create Crud
  .post((req, res) => {
    var todo = new Todo({
      title: req.body.title,
      body: req.body.body,
      priority : req.body.priority,
      formattedCreate: formatDate.formatDate(new Date()),
      formattedUpdate: formatDate.formatDate(new Date())
    });
    todo.save((err, doc) => {
      if (err) return console.log(err);
      res.send({
        msg:"create successful!",
        data:doc
      });
    });
  });

router.route('/:todo_id')
  // todo show - one todo  cRud
  .get((req, res) => {
    Todo.findById(req.params.todo_id, (err, todo) => {
      if (err) {
        res.sent(err);}
      res.send(todo);
    });
  })
  // todo update  crUd
  .put((req, res) => {
    Todo.findById(req.params.todo_id, (err, todo) => {
      if (err) {res.send(err);}
      todo.title = req.body.title;
      todo.body = req.body.body;
      todo.priority = req.body.priority;
      todo.formattedUpdate = formatDate.formatDate(new Date());
      if (req.body.completed ) {
        todo.completed = true;
        todo.completedDate = new Date();
      } else {
        todo.completed = false;
      }
      todo.save((err, doc) => {
        if (err) return console.log(err);
        res.send({
          msg: "update successful!",
          data: doc
        });
      });
    });
  })
  // todo delete cruD
  .delete((req, res) => {
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
