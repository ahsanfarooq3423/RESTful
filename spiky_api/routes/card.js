const express = require('express');

const cardController = require('../controller/card');

const router = express.Router();

router.post('/boards/:boardId/:listId', cardController.postCard );

module.exports = router