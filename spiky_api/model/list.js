const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema =  new Schema({
    listName : {
        type : String,
        required : true,
    },
    cards : {
        items : [
            {
                type : mongoose.Types.ObjectId,
                ref : 'Card'
            }
        ]
    },
    boardId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'Board'
    }
}, {timestamps : true})



listSchema.methods.addCardRefToList = function(cardId) {
    console.log(' reached inside the schema methods')
    this.cards.items.push(mongoose.Types.ObjectId(cardId))
    return this.save()
}


module.exports = mongoose.model('List', listSchema);    