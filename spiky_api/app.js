const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path  = require('path');


const boardsRoutes = require('./routes/board');
const listRoutes = require('./routes/list');
const cardRoutes = require('./routes/card');
const authRoutes = require('./routes/auth');

const dbConfig = require('./config/db');

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
        cb(null, true)
    } else {
        cb(null, false)
    }
}


app.use(bodyParser.json());
app.use(multer({storage : fileStorage, fileFilter : fileFilter}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


app.use(boardsRoutes);
app.use(listRoutes);
app.use(cardRoutes);
app.use(authRoutes);

//error handling middleware
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(statusCode).json({message, data : data })
})


mongoose.connect(dbConfig.mongodbURI, {useUnifiedTopology : true, useNewUrlParser :true})
    .then(response => {
        app.listen(8080, () => console.log('CONNECTED WITH DB AND RUNNING 8080'));
    })
    .catch(err => console.log(err))
