const express = require('express');

const boardsController = require('../controller/board');

const router = express.Router();

router.get('/boards', boardsController.getBoards);

router.post('/board', boardsController.createBoard);

router.get('/boards/:boardId', boardsController.getBoard);

router.post('/boards/:boardId', boardsController.createList);

module.exports = router;