const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user found in the DB'
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  //this will be helpful for user profile
  req.profile.salt = undefined; //hide all unwanted info
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

// update user

exports.updateUser = (req, res) => {
  //   mongodb update query
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, userFindAndModify: false }, //this parameters are compulsory while passing findbyid
    (err, user) => {
      if (err) {
        return status(400).json({
          error: 'You are not authorized to edit this user'
        });
      }
      user.salt = undefined;
      (user.encry_password = undefined), res.json(user);
    }
  );
};
