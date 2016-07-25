const express = require('express'),
       router = express.Router(),
     mongoose = require('mongoose'),
         Todo = require('../modules/todoModel');

// todo index - all todos
router.get('/', (req, res) => {
  Todo.find({
  }, (err, docs) => {
    // console.log(docs);
    // res.send(docs);
    res.render('index', { title: 'TodoTwo', todosObj: docs });
  });
});

// todo show - one todo -response is json
// router.get('/:todo_id', (req, res) => {
//   Todo.findById(req.params.todo_id, (err, todo) => {
//     if (err)
//       res.send(err);
//     res.send(todo);
//   });
// });

// create todo
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

// edit todo
router.put('/:todo_id', (req, res) => {
  Todo.findById(req.params.todo_id, (err, todo) => {
    if (err)
      res.send(err);
    todo.title = req.body.title;
    todo.body = req.body.body;
    todo.save((err, doc) => {
      if (err) return consol.error(err);
      Todo.find({
      }, (err, docs) => {
        res.render('index', { title: 'Express', todosObj: docs });
      });
    });
  });
});

router.delete('/:todo_id', (req, res) => {
  Todo.remove({_id: req.params.todo_id}, (err) => {
    if (err)
      res.send(err);
    else {
      Todo.find({
      }, (err, docs) => {
        res.render('index', { title: 'Express', todosObj: docs });
      });
    }
  });
});

module.exports = router;
