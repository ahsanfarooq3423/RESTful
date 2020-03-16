const mongoose = require('mongoose');

const Board = require('../model/board');
const List = require('../model/list');

exports.getBoards = (req, res, next) => {
    const full = req.query.full;
    if (full === 'true') {
        Board.find()
            .populate('list.items')
            .then(boards => {
                res.status(200).json({ message: 'Boards Fetched Successfully', boards })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 404;
                }
                next(err)
            })
    } else {
        Board.find()
            .then(boards => {
                res.status(200).json({ message: 'Boards Fetched Successfully', boards })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 404;
                }
                next(err)
            })
    }

}

exports.getBoard = (req, res, next) => {
    const boardId = req.params.boardId;
    Board.findById(boardId)
        .populate({
            path : 'list.items',
            populate : {
                path : 'cards',
                model : 'Card'
            }
        })
        .then(board => {
            if (board){
                res.status(200).json({
                    message: 'Successfully fetched the board', board
                })
            } else {
                const error = new Error("Can't find the board.")
                error.statusCode  = 404;
                throw error
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 404;
            }
            next(err)
        })
}


exports.createBoard = (req, res, next) => {
    const boardName = req.body.boardName;
    const imageUrl = req.body.imageUrl;

    const board = new Board({ boardName, imageUrl })

    board.save()
        .then(board => {
            res.status(201).json({ message: 'Created the Boards Successfully...', board })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 406;
            }
            next(err)
        })
}



