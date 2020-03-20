const express = require('express');

const validator = require('./validation/validation');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

router.post('/post', validator.postValidation, feedController.createPost);

router.get('/post/:postId', feedController.getPost);

router.put('/post/:postId', validator.postValidation, feedController.updatePost);

router.delete('/post/:postId', feedController.deletePost);

module.exports = router;