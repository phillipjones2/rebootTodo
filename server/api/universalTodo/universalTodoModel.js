const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const universalTodoSchema = new Schema({
  title : {
    type: String,
    required: true,
    trim: true,
    maxlength: 55
  },
  body : {
    type: String,
    maxlength: 140
  },
  priority : {
    type: Number,
    min: 0,
    max: 2
  },
  formattedCreate : String,
  formattedUpdate : String,
  completed : {
    type: Boolean,
    default: false
  },
  completedDate : { type: Date },
},
{
  timestamps: true
});

const UniversalTodo = mongoose.model('UniversalTodo', universalTodoSchema);

module.exports = UniversalTodo;
