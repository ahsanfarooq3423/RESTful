const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const boardsRoutes = require('./routes/board');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


app.use(boardsRoutes);

//error handling middleware
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    res.status(statusCode).json({message})
})


mongoose.connect('mongodb://ahsan:mongodb8008@ds257314.mlab.com:57314/spiky',
     {useUnifiedTopology : true, useNewUrlParser :true})
    .then(response => {
        app.listen(8080, () => console.log('CONNECTED WITH DB AND RUNNING 8080'));
    })
    .catch(err => console.log(err))
