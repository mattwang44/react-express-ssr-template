'use strict';

import express from 'express';
import {getTodoItems} from './todoItem.controller';


const router = express.Router();
router.get('', getTodoItems);


export default router;
