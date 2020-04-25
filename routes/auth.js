var express = require('express');
var router = express.Router();
//in routes we have signout we are using that
const { signout, signup } = require('../controllers/auth');

router.post('/signup', signout);
router.get('/signout', signout);

module.exports = router;
