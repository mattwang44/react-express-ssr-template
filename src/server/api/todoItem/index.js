'use strict';

const express = require('express');
const {getTodoItems, postTodoItem} = require('./todoItem.controller');


const router = express.Router();
router.get('', getTodoItems);
router.post('', postTodoItem);


module.exports = router;
