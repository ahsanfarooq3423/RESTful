const mongoose = require('mongoose');
const Board = require('../model/board');
const List = require('../model/list');
const Card = require('../model/card');


exports.createList = (req, res, next) => {
    const stringBoardId = req.params.boardId;
    const boardId = mongoose.Types.ObjectId(stringBoardId);
    const listName = req.body.listName;
    if (listName) {
        const list = new List({listName,boardId})
    
        list.save()
            .then(response => {
                return response._id
            })
            .then(id => {
                Board.findById(boardId)
                    .then(board => {
                        return board.addListRefToBoard(id)
                    })
                    .catch(err => console.log(err))
            })
            .then(response => {
                res.status(201).json({
                    message : 'List has been created Successfully huhu'
                })
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        const error = new Error('The list name is not defined')
        error.statusCode = 406;
        throw error;
    }

}

exports.deleteList = (req, res, next) => {
    const boardId = req.params.boardId;
    const listId = req.params.listId;

    Board.findById(boardId)
        .then(board => {
            let newList = board.list.items.filter(item => {
                if (item.toString() !== listId) {
                    return item
                } 
            })
            board.list.items =  newList
            return board.save()
        .then(result => {
            return List.findByIdAndRemove(listId)
        }) 
        .then(result => {
            return Card.deleteMany({ listId : listId })
        })
        .then(response => {
            res.status(200).json({
                message : "this is new freaking second time response",
                response : response
            })
        }) 
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 406;
            }
            next(err)
        })
}
