const express = require('express');

const listController = require('../controller/list');

const router = express.Router(); 

router.post('/boards/:boardId', listController.createList);

router.delete('/boards/:boardId/:listId', listController.deleteList);

module.exports = router;