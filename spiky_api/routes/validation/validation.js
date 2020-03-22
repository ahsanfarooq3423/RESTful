const {body} = require('express-validator');

exports.boardValidator = [
    body('boardName').trim().isLength({min : 3}).withMessage('Board Name must be atleast 3 characters long.')
]

exports.listValidator = [
    body('listName').trim().isLength({min : 3}).withMessage('List Name must be atleast 3 characters long.')
]

exports.cardValidator = [
    body('listName').trim().isLength({min : 3}).withMessage('Card Name must be atleast 3 characters long.')
]