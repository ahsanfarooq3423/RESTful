const express = require('express');

const { body } = require('express-validator');

const validator = require('./validation/validation');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

router.post('/post', validator.createPostValidation, feedController.createPost);

router.get('/post/:postId', feedController.getPost);

module.exports = router;