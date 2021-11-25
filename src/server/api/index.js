'use strict';

const express = require('express');
const todoItemRouter = require('./todoItem');

const router = express.Router();

router.use('/todoItem', todoItemRouter);

module.exports = router;
