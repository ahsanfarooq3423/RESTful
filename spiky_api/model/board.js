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
                ref : 'List'
            }
        ]
    } 
    // userId : {
    //     type : Schema.Types.ObjectId,
    //     required : true
    // }
}, {timestamps : true})



boardSchema.methods.addListRefToBoard = function(listId) {
    this.list.items.push(mongoose.Types.ObjectId(listId))
    return this.save()
}

// boardSchema.methods.addCardRefToBoard  = function(cardId, listId) {

//     console.log(typeof(cardId))

//     // const targetIndex = this.list.items.findIndex(item =>  item._id.toString() === listId.toString())
//     console.log('-------')
//     this.list.items[0].cards = [];
//     console.log(this.list.items[0].cards)
//     console.log('--------')
//     this.list.items[0].cards.push(cardId)
//     console.log(this.list.items[0])
//     console.log('-------')



//     // if (this.list.items[targetIndex].cards){
//     //     this.list.items[targetIndex].cards.items.push({
//     //         cardId
//     //     });
//     // } else {
//     //     this.list.items[targetIndex].cards = {
//     //         items : []
//     //     };
//     //     this.list.items[targetIndex].cards.items.push(cardId)
//     //     return this
//     // }
//     // // return this.save()
// }


module.exports = mongoose.model('Board', boardSchema);