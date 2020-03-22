const express = require('express');

const validator = require('./validation/validation');


const listController = require('../controller/list');

const router = express.Router(); 

router.post('/boards/:boardId', validator.listValidator ,listController.createList);

router.put('/boards/:boardId/:listId', listController.updateList);

router.delete('/boards/:boardId/:listId', listController.deleteList);

module.exports = router;