const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  username  : {
    type: String,
    unique: true,
    required: true
  },
},
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
