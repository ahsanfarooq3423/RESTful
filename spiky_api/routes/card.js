const express = require('express');

const cardController = require('../controller/card');

const router = express.Router();

router.post('/boards/:boardId/:listId', cardController.postCard );

router.put('/boards/:boardId/:listId/:cardId', cardController.updateCard);

router.delete('/boards/:boardId/:listId/:cardId', cardController.deleteCard );

module.exports = router