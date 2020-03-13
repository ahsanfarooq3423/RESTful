exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id : '1',
            title: 'this is the first post in json',
            content: 'this is my first post!!',
            imageUrl: 'images/duck.jpg',
            creator : {
                name : 'Ahsan'
            },
            createdAt : new Date()
        }]
    })
}

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message: 'Post Created Successfully!',
        post: { id: new Date().toISOString(), title, content }
    })
}


