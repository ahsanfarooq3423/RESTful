const { body } = require('express-validator');


exports.createPostValidation =  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
];




