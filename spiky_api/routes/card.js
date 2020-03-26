const express = require('express');

const validator = require('./validation/validation');

const isAuth = require('../middleware/is-auth');

const cardController = require('../controller/card');

const router = express.Router();

router.post('/boards/:boardId/:listId', isAuth , validator.cardValidator , cardController.postCard );

router.put('/boards/:boardId/:listId/:cardId', isAuth ,cardController.updateCard);

router.delete('/boards/:boardId/:listId/:cardId', isAuth , cardController.deleteCard );

module.exports = router;