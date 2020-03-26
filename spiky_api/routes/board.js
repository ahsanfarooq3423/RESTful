const express = require('express');
const validator = require('./validation/validation');

const isAuth = require('../middleware/is-auth');

const boardsController = require('../controller/board');

const router = express.Router();

router.get('/boards', isAuth ,  boardsController.getBoards);

router.post('/boards', isAuth , validator.boardValidator ,boardsController.createBoard);

router.get('/boards/:boardId',isAuth , boardsController.getBoard);

router.put('/boards/:boardId', isAuth ,boardsController.updateBoard);

router.delete('/boards/:boardId',isAuth , boardsController.deleteBoard);


module.exports = router;