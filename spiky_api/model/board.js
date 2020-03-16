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
    list : {
        items : [
            {
                type : Schema.Types.ObjectId,
                ref : 'List',
                cards : [
                    {
                        type : Schema.Types.ObjectId,
                        ref : 'Card'
                    }

                ]
            }
        ]
    } 
    // userId : {
    //     type : Schema.Types.ObjectId,
    //     required : true
    // }
}, {timestamps : true})



boardSchema.methods.addListRefToBoard = function(boardId) {
    this.list.items.push(mongoose.Types.ObjectId(boardId))
    return this.save()
}
module.exports = mongoose.model('Board', boardSchema);