const express = require('express');
const { registerUser } = require('../controller/userController');
const { loginUser} = require('../controller/userController');

const { googleAuth } = require('../controller/authController');

const router = express.Router();

    router.post ('/register', registerUser);
    router.post ('/login', loginUser);  
    router.post ('/google', googleAuth);

module.exports = router;