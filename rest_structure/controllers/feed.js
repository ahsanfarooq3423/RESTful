const { validationResult } = require('express-validator');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: '1',
            title: 'this is the first post in json',
            content: 'this is my first post!!',
            imageUrl: 'images/duck.jpg',
            creator: {
                name: 'Ahsan'
            },
            createdAt: new Date()
        }]
    })
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return  res.status(422).json({
            message : 'Validation failed, entered data is not correct',
            errors : errors.array()
        });
    }
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message: 'Post Created Successfully!',
        post: {
            _id: new Date().toISOString(),
            title, content,
            creator: { name: 'Ahsan' },
            createdAt: new Date()
        }
    })
}
