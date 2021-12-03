'use strict';

const {validationResult, check, matchedData} = require('express-validator');
const mongoose = require('mongoose');

const TodoItem = require('./todoItem.model');


exports.isValidStatus = (status) => ['todo', 'wip', 'done'].includes(status);

exports.postTodoItem = [
    check('title').exists(),
    check('description').optional(),
    check('createdAt')
        .optional()
        .isISO8601(),
    check('expiredAt')
        .exists()
        .isISO8601(),
    check('tags')
        .exists()
        .isArray({min: 1})
        .withMessage('not an array with at least one item'),
    check('status')
        .optional()
        .custom((value) => exports.isValidStatus(value)),
    check('isArchived')
        .optional()
        .toBoolean(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const data = matchedData(req);
        try {
            const item = await TodoItem.create(data);
            console.log({msg: 'item created', id: item._id});
            return res.status(201).json(item);
        } catch (err) {
            console.error({msg: 'something went wrong when creating item', err});
        }
    }
];

exports.getTodoItems = [
    check('_id').optional().isMongoId(),
    check('tag').optional(),
    check('status')
        .optional()
        .custom((value) => exports.isValidStatus(value)),
    check('isArchived')
        .optional()
        .toBoolean(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {_id, tag, status, isArchived} = matchedData(req);
        const match = {};
        if (_id) {
            match._id = mongoose.Types.ObjectId(_id);
        }
        if (tag) {
            match.tags = {$in: [tag]};
        }
        if (status) {
            match.status = status;
        }
        if (isArchived) {
            match.isArchived = isArchived;
        }

        const query = [
            {$match: match}
        ];

        TodoItem.aggregate(query)
            .exec()
            .then((items) => {
                console.log({msg: 'retrieved items', count: items.length});
                return res.status(200).json(items);
            })
            .catch((reason) => {
                console.error({msg: 'something went wrong when retrieving items', reason});
                return res.status(500).json('Error fetching items, reason=' + reason);
            });
    }
];
