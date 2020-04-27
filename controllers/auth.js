const User = require('../models/user');

exports.signup = (req, res) => {
  const user = new User(req.body); //User is coming from model
  user.save((err, user) => {
    console.log(err);
    if (err) {
      return res.status(400).json({
        //if err in saving show this

        err: 'NOT able to save user in DB'
      });
    } //if everything is correct show this
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: 'User signout'
  });
};
