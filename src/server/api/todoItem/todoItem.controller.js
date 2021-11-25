'use strict';

const TodoItem = require('./todoItem.model');


function isValidStatus(status) {
    return ['todo', 'wip', 'done'].includes(status);
}

exports.getTodoItems = (req, res) => {
    const {status} = req.body;
    if (!isValidStatus(status)) {
        return res.status(400).json('Invalid status: ' + status);
    }

    const query = [
        {$match: {status}}
    ];

    TodoItem.aggregate(query)
        .exec()
        .then((items) => {
            return res.status(200).json(items);
        })
        .catch((reason) => {
            return res.status(500).json('Error fetching items, reason=' + reason);
        });
};