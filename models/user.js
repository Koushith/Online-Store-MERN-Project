var mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

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
  },
  userinfo: {
    type: String,
    trim: true
  },
  //  check later for hashing password
  encry_password: {
    type: String,
    required: true
  },
  salt: String,
  role: {
    type: Number,
    default: 0
  },
  purchases: {
    type: Array,
    default: [] // when user buys, push into array
  }
});

// virtual fields

userSchema
  .virtual('password') //password is coming from user-
  .set(function(password) {
    this._password = password; //_ private- store password in private var
    this.salt = uuidv1(); //got from docs, populating
    this.encry_password = this.securedPassword(password); //assigning hashed pass
  })
  .get(function() {
    this._password;
  });

// encrypt the password

userSchema.method = {
  // authendicate
  authendicate: function(plainpassword) {
    return this.securedPassword(plainpassword) === this.encry_password;
  },

  // hashing
  securedPassword: function(plainpassword) {
    if (!plainpassword) return '';
    try {
      return crypto
        .createHmac('sha256', this.salt) //refers to salt
        .update(plainpassword)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }
};

module.exports = mongoose.model('User', userSchema);

// watch again
