const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const todoSchema = new Schema({
  title          : { type: String, required: true },
  body           : String,
  priority       : Number,
  formattedCreate : String,
  formattedUpdate : String
},
{
  timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
