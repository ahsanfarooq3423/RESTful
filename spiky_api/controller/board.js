const Board = require('../model/board');

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