const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  // dont store the password as plain text
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

// middleware that will run before a document
// is created
UserSchema.pre('save', function(next) {

  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
});


UserSchema.methods = {
  // check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  // hash the passwords
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return '';
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  }
};

module.exports = mongoose.model('user', UserSchema);
