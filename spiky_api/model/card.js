const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    cardName : {
        type : String,
        required : true
    },

    listId : {
        type : mongoose.Types.ObjectId,
        ref : 'List',
        required  : true
    },

    boardId : {
        type : Schema.Types.ObjectId,
        ref : 'Board',
        required : true
    }

})

cardSchema.methods.addBoardAndListRefToCard = function(boardId, listId) {
    this.listId = listId
    this.boardId = boardId
    return this.save()
}

module.exports = mongoose.model('Card', cardSchema);