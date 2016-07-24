const express = require('express'),
       router = express.Router(),
     mongoose = require('mongoose'),
         Todo = require('../modules/todoModel');

router.get('/', (req, res) => {
  Todo.find({
  }, (err, docs) => {
    console.log(docs);
    // res.send(docs);
    res.render('index', { title: 'Express', todosObj: docs });
  });
});


module.exports = router;
