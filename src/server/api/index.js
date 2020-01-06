'use strict';

import express from 'express';
import todoItemRouter from './todoItem';

const router = express.Router();

router.use('/todoItem', todoItemRouter);

export default router;
