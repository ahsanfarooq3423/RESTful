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
            path: 'list.items',
            populate: {
                path: 'cards',
                model: 'Card'
            }
        })
        .then(board => {
            if (board) {
                res.status(200).json({
                    message: 'Successfully fetched the board', board
                })
            } else {
                const error = new Error("Can't find the board.")
                error.statusCode = 404;
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

exports.updateBoard = (req, res, next) => {
    const boardId = req.params.boardId;
    const updatedBoardName = req.body.boardName;
    const updatedImageUrl = req.body.imageUrl;

    Board.findById(boardId)
        .then(board => {
            if (!board) {
                const error = new Error('The board you requested is not found');
                error.statusCode = 404;
                throw error;
            }
            if (updatedBoardName){
                board.boardName  = updatedBoardName;
            }
            if (updatedImageUrl) {
                board.imageUrl = updatedImageUrl
            }
            return board.save()
        })
        .then(result => {
            res.status(200).json({
                message : 'The board is updated successfully',
                result : result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 406;
            }
            next(err)
        })
}

exports.deleteBoard = (req, res, next) => {
    const boardId = req.params.boardId;

    Board.findById(boardId)
        .then(board => {
            if (!board) {
                const error = new Error('Board not found');
                error.statusCode = 404;
                throw error
            }
            return board
        })
        .then(board => {
            return List.deleteMany({boardId  : boardId})
        .then(response => {
            Board.findByIdAndRemove(boardId)
            .then(result => {
                res.status(200).json({
                    message : 'The board has been deleted successfully',
                    result : result
                })
            })
            .catch(err => {
                next(err)
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



