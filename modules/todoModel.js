const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const todoSchema = new Schema({
  title          : { type: String, required: true },
  body           : String,
  priority       : { type: String, default: 'Medium' },
  formatedCreate : String,
  formatedUpdate : String
},
{
  timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
