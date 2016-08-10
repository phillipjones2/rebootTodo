const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const todoSchema = new Schema({
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
  user : {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
},
{
  timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
