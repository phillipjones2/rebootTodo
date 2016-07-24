const express = require('express'),
       router = express.Router(),
     mongoose = require('mongoose'),
         Todo = require('../modules/todoModel');

router.get('/', (req, res) => {
  Todo.find({
  }, (err, docs) => {
    console.log(docs);
    // res.send(docs);
    res.render('index', { title: 'TodoTwo', todosObj: docs });
  });
});

router.post('/', (req, res) => {
  var todo = new Todo({ title: req.body.title, body: req.body.body});
  todo.save((err, doc) => {
    if (err) return console.error(err);
    Todo.find({
    }, (err, docs) => {
      res.render('index', { title: 'Express', todosObj: docs });
    });
  });
});

module.exports = router;
