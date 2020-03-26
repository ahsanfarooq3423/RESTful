const mongoose = require('mongoose');

const Board = require('../model/board');
const List = require('../model/list');
const User = require('../model/user');


const { validationResult } = require('express-validator');


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
    const userId = req.userId;

    let user;
    let boardResult;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, the entered data is not correct')
        throw error
    }
    if (!req.file) {
        const error = new Error('Error !! Image File not uploaded')
        throw error
    }

    const boardName = req.body.boardName;
    const imageUrl = req.file.path;


    User.findOne({ _id: userId })
        .then(userDoc => {
            user = userDoc
            const board = new Board({ boardName, imageUrl, userId })
            return board.save()
        })
        .then(result => {
            boardResult = result;
            const boardId = result._id;
            user.boards.push(mongoose.Types.ObjectId(boardId))
            return user.save()
        })
        .then(result => {
            res.status(201).json({
                message: 'Created the Board Successfully ...',
                result: boardResult
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 406;
            }
            next(err)
        })
}

exports.updateBoard = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, the entered data is not correct')
        throw error
    }

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
            if (updatedBoardName) {
                board.boardName = updatedBoardName;
            }
            if (updatedImageUrl) {
                board.imageUrl = updatedImageUrl
            }
            return board.save()
        })
        .then(result => {
            res.status(200).json({
                message: 'The board is updated successfully',
                result: result
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
    const userId = req.userId;

    let user;

    User.findOne({ _id: userId })
        .then(userDoc => {
            user = userDoc;
            user.boards = user.boards.filter(id => {
                if (id.toString() !== boardId) {
                    return id;
                }
            })
            return user.save()
        })
        .then(result => {
            return Board.findById(boardId)
        })
        .then(board => {
            if (!board) {
                const error = new Error('Board not found');
                error.statusCode = 404;
                throw error
            }
            return board
        })
        .then(board => {
            return List.deleteMany({ boardId: boardId })
                .then(response => {
                    Board.findByIdAndRemove(boardId)
                        .then(result => {
                            res.status(200).json({
                                message: 'The board has been deleted successfully',
                                result: result
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



