exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts : [{title : 'my first post', content : 'this is my first post!!'}]
    })
}

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message : 'Post Created Successfully!',
        post : {id : new Date().toISOString() , title, content}
    })
}