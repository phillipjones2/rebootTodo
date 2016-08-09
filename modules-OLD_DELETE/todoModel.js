const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const todoSchema = new Schema({
  title           : { type: String,
                      required: true,
                      trim: true,
                      maxlength: 55
                    },
  body            : { type: String,
                      maxlength: 140
                    },
  priority        : Number,
  formattedCreate : String,
  formattedUpdate : String,
  completed       : { type: Boolean, default: false },
  completedDate   : { type: Date }
},
{
  timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
