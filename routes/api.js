const express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Todo = require('../modules/todoModel');

var today = new Date(),
    yesterday = new Date(today.setDate(today.getDate() -1)),
    thisWeek = new Date(today.setDate(today.getDate() - 7));

// todo index - all todos
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
    res.send(docs);
  });
});

// todo create
router.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({title: req.body.title, body: req.body.body, priority : req.body.priority});
  todo.save((err, doc) => {
    if (err) return console.log(err);
    res.send({
      msg:"state successful!",
      data:doc
    });
  });
});



module.exports = router;
