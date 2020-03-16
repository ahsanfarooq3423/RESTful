const Card = require('../model/card');
const List = require('../model/list');
const Board = require('../model/board');

const mongoose = require('mongoose');



exports.postCard = (req, res, next) => {
    const boardId = req.params.boardId;
    const listId = req.params.listId;

    const cardName = req.body.cardName;

    const objBoardId = mongoose.Types.ObjectId(boardId);
    const objListId = mongoose.Types.ObjectId(listId);
    let objCardId;

    let listResponse;

    const card = new Card({
        cardName : cardName,
        listId : objListId,
        boardId : objBoardId
    })


    Board.findById(boardId)
        .populate({
            path: 'list.items'
            ,
            match: {
                _id: objListId
            }
        })
        .then(board => {
            if (board.list.items.length === 1){
                return card.addBoardAndListRefToCard(objBoardId, objListId)
            } else {
                const error = new Error('The List in the given board in not found')
                error.statusCode = 404
                throw error
            }
        })
        .then(response => {
            listResponse = response
            objCardId = response._id;

            List.findById(listId)
                .then(list => {
                    list.addCardRefToList(objCardId)
                })
                .catch(err => {
                    next(err)
                })

            return listResponse
            
        })
        .then(response => {

            res.status(202).json({
                message: 'just checking the bababa route',
                response : response
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 404;
            }
            next(err)
        })
}
