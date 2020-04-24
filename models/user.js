var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true //remove spaces
  },
  lastname: {
    type: String,
    maxlength: 32,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  }
  //  check later for hashing password
});
