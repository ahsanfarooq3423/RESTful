const express = require('express');
const validator = require('./validation/validation');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', validator.signupValidation, authController.signup);

router.post('/login', authController.login);

module.exports = router;