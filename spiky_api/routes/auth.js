const express = require('express');

const authController = require('../controller/auth');

const router = express.Router();

// authController.signup

router.put('/auth/signup', authController.signup);

router.post('/auth/login', authController.login);


module.exports = router;

