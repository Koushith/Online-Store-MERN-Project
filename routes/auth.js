var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');

// sign up
router.post(
  '/signup',
  [
    check('name', 'name should be at least 3 char').isLength({ min: 3 }),
    check('email', 'email is required').isEmail(),
    check('password', 'password should be at least 3 char').isLength({ min: 3 })
  ],
  signup
);

// sign in
router.post(
  '/signin',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password field is required').isLength({ min: 1 })
  ],
  signin
);

// signout
router.get('/signout', signout);

router.get('/testroute', isSignedIn, (req, res) => {
  res.send('A protected Route');
});

module.exports = router;
