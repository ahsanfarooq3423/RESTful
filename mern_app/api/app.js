const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const feedRoutes = require('./routes/feed');

const app = express();

const fileStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'images')
    },
    filename : (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false)
    }
}



app.use(bodyParser.json()); // application/json
app.use(multer({storage : fileStorage, fileFilter : fileFilter}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message : message
    })
})


mongoose.connect('mongodb://ahsan:mongodb8008@ds029797.mlab.com:29797/mern',
     {useNewUrlParser : true, useUnifiedTopology : true})
    .then(result => {
        app.listen(8080, () => console.log('connected on 8080'))
    }) 
    .catch(err => console.log(err))

