const express = require('express');

const boardsController = require('../controller/board');

const router = express.Router();

router.get('/boards', boardsController.getBoards);

router.post('/boards', boardsController.createBoard);

router.get('/boards/:boardId', boardsController.getBoard);

router.put('/boards/:boardId', boardsController.updateBoard);

router.delete('/boards/:boardId', boardsController.deleteBoard);


module.exports = router;