const express = require('express');
const router = express.Router();

const { getUserById, getUser, updateUser } = require('../controllers/user');
const { isSignedIn, isAdmin, isAuthenticated } = require('../controllers/auth');

router.param('userId', getUserById); //useris cn be anything, its populating from get user fromid
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
// update-- allow editing only on his profile
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);
module.exports = router;
