const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema =  new Schema({
    listName : {
        type : String,
        required : true
    },
    boardId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'Board'
    }
}, {timestamps : true})



module.exports = mongoose.model('List', listSchema);    