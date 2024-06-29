const express = require('express');
const { signup, signin,profile, totalUser } = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/auth');  // Import the auth middleware

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/totalUser',totalUser)
module.exports = router;
