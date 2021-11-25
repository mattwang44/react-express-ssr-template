'use strict';

const express = require('express');
const {getTodoItems} = require('./todoItem.controller');


const router = express.Router();
router.get('', getTodoItems);


module.exports = router;
