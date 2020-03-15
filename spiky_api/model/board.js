const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    boardName : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    lists : [
        {
            type : Schema.Types.ObjectId,
            ref : 'List'
        }
    ]
    // userId : {
    //     type : Schema.Types.ObjectId,
    //     required : true
    // }
}, {timestamps : true})

module.exports = mongoose.model('Board', boardSchema);