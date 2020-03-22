const express = require('express');

const cardController = require('../controller/card');

const router = express.Router();

router.post('/boards/:boardId/:listId', cardController.postCard );

router.delete('/boards/:boardId/:listId/:cardId', cardController.deleteCard );

module.exports = router