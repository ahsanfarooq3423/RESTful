const express = require('express');

const boardsController = require('../controller/board');

const router = express.Router();

router.get('/boards', boardsController.getBoards);

router.post('/board', boardsController.createBoard);

module.exports = router;