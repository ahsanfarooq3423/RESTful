const Card = require('../model/card');
const List = require('../model/list');
const Board = require('../model/board');

const { validationResult } = require('express-validator');

const mongoose = require('mongoose');

exports.postCard = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, the entered data is not correct')
        throw error
    }

    const boardId = req.params.boardId;
    const listId = req.params.listId;

    const cardName = req.body.cardName;

    const objBoardId = mongoose.Types.ObjectId(boardId);
    const objListId = mongoose.Types.ObjectId(listId);
    let objCardId;

    let listResponse;

    const card = new Card({
        cardName: cardName,
        listId: objListId,
        boardId: objBoardId
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
            if (board.list.items.length === 1) {
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
                message: 'Created the Card Successfully',
                response: response
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 404;
            }
            next(err)
        })
}

exports.updateCard = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, the entered data is not correct')
        throw error
    }

    const boardId = req.params.boardId;
    const listId = req.params.listId;
    const cardId = req.params.cardId;

    const updatedCardName = req.body.cardName;

    Board.findById(boardId)
        .then(board => {
            if (!board.list.items.includes(mongoose.Types.ObjectId(listId))){
                console.log(' in the first if block baby')
                const error = new Error("The List in the specified board for the particular card is not found")
                throw error;
            }
            return List.findById(listId)
        })
        .then(list => {
            if (!list.cards.items.includes(mongoose.Types.ObjectId(cardId))) {
                const error = new Error("The Card specified in the list is not found.")
                throw error;
            }

            return Card.findById(cardId)

        })
        .then(card => {
            if (!card) {
                const error = new Error("The Card is not found in the give list.")
                throw error;
            }
            if (!updatedCardName) {
                const error = new Error("Card is not updated because no updated information was given")
                throw error;
            }
            card.cardName = updatedCardName
            return card.save()
        })
        .then(result => {
            res.status(200).json({
                message : "The card has been updated Successfully",
                result : result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 404;
            }
            next(err)
        })

}


exports.deleteCard = (req, res, next) => {
    const boardId = req.params.boardId;
    const listId = req.params.listId;
    const cardId = req.params.cardId;

    Board.findById(boardId)
        .then(board => {
            // auth logic in the future
            return List.findById(listId)
        })
        .then(list => {
            if (!list) {
                const error = new Error('List for the given board in not found');
                throw error
            }
            let newList = list.cards.items.filter(item => {
                if (item.toString() !== cardId) {
                    return item
                }
            })
            list.cards.items = newList;
            return list.save()
        })
        .then(response => {
            Card.findByIdAndRemove(cardId)
                .then(result => {
                    res.status(200).json({
                        message : "The Card has been deleted successfully",
                        result : result
                    })
                })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 404;
            }
            next(err)
        })

}
