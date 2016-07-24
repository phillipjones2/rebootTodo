const express = require('express'),
       router = express.Router(),
     mongoose = require('mongoose'),
         Todo = require('../modules/todoModel');

router.get('/all', (req, res) => {
  Todo.find({
  }, (err, docs) => {
    console.log(docs);
    res.send(docs);
  });
});


module.exports = router;
