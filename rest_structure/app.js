const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoutes);


mongoose.connect('mongodb://ahsan:mongodb8008@ds029797.mlab.com:29797/mern',
     {useNewUrlParser : true, useUnifiedTopology : true})
    .then(result => {
        app.listen(8080, () => console.log('connected on 8080'))
    }) 
    .catch(err => console.log(err))

