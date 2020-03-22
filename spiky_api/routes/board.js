const express = require('express');

const boardsController = require('../controller/board');

const router = express.Router();

router.get('/boards', boardsController.getBoards);

router.post('/boards', boardsController.createBoard);

router.get('/boards/:boardId', boardsController.getBoard);

router.delete('/boards/:boardId', boardsController.deleteBoard);


module.exports = router;