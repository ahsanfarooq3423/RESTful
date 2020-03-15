const Board = require('../model/board');
const List = require('../model/list');

exports.getBoards = (req, res, next) => {
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

exports.getBoard = (req, res, next) => {
    const boardId = req.params.boardId;
    Board.findById(boardId)
        .then(board => {
            res.status(200).json({
                message : 'Successfully fetched the board', board })
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


exports.createList = (req, res, next) => {
    const boardId = req.params.boardId;
    console.log(boardId);
    Board.findById(boardId)
        .then(response => {
            console.log(response)
            res.status(200).json({
                message : 'in the create list',
                response
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

