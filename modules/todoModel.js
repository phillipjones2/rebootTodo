const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
  title     : { type: String, required: true },
  body      : String
},
{
  timestamps: true
});

module.export = Todo;
