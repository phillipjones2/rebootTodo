const express = require('express'),
       router = express.Router(),
     mongoose = require('mongoose'),
         Todo = require('../modules/todoModel');

// todo index - all todos
router.get('/', (req, res) => {
  Todo.find().sort('priority').exec((err, docs) => {
    // res.send(docs);
    // console.log(docs);
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
  console.log(req.body);
  var todo = new Todo({ title: req.body.title, body: req.body.body, priority: req.body.priority});
  todo.save((err, doc) => {
    if (err) return console.error(err);
    Todo.find().sort('priority').exec((err, docs) => {
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
      Todo.find().sort('priority').exec((err, docs) => {
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
      Todo.find().sort('priority').exec((err, docs) => {
        res.render('index', { title: 'Express', todosObj: docs });
      });
    }
  });
});

function formatDate(date) {
  let hours = date.getHours(),
    minutes = date.getMinutes(),
       ampm = hours >= 12 ? 'pm' : 'am',
    DaysArr = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri'],
    MonthsArr = ['Januray', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      // Month = date.getMonth() +1;
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  let strTime = `${DaysArr[date.getDay()]} ${MonthsArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hours}:${minutes}${ampm}`;
  return strTime;
}

module.exports = {router, formatDate};
