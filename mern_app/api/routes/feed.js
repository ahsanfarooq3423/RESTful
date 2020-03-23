const express = require('express');

const validator = require('./validation/validation');

const isAuth = require('../middleware/is-auth');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/posts
router.get('/posts', isAuth ,feedController.getPosts);

router.post('/post', isAuth ,validator.postValidation, feedController.createPost);

router.get('/post/:postId', isAuth ,feedController.getPost);

router.put('/post/:postId', isAuth ,validator.postValidation, feedController.updatePost);

router.delete('/post/:postId', isAuth ,feedController.deletePost);

module.exports = router;