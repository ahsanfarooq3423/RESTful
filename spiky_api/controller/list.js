const mongoose = require('mongoose');
const Board = require('../model/board');
const List = require('../model/list');

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
