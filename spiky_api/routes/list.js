const express = require('express');

const validator = require('./validation/validation');

const isAuth = require('../middleware/is-auth');

const listController = require('../controller/list');

const router = express.Router(); 

router.post('/boards/:boardId', isAuth , validator.listValidator ,listController.createList);

router.put('/boards/:boardId/:listId', isAuth , listController.updateList);

router.delete('/boards/:boardId/:listId', isAuth , listController.deleteList);

module.exports = router;