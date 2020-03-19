const { validationResult } = require('express-validator');

const Post = require('../models/posts');

exports.getPosts = (req, res, next) => {

    Post.find()
        .then(posts => {
            res.status(200).json({
                message: 'Posts fetched successfully.',
                posts: posts
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is not correct')
        error.statusCode = 422;
        throw error;
    }

    
    if (!req.file) {
        const error  = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }
    
    console.log(req.file) 

    const title = req.body.title;
    const imageUrl = req.file.path;
    const content = req.body.content;
    const post = new Post({
        title, content,
        creator: { name: 'Ahsan' },
        imageUrl: imageUrl 
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'Post Created Successfully!',
                post: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;

    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Post Not Found')
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: "Post fetched.", post: post })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}
