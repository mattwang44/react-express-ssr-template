'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoItemSchema = new Schema(
    {
        title: {type: String, trim: true},
        description: {type: String, trim: true},
        createdAt: {type: Date, default: Date.now, index: true},
        expiredAt: {type: Date, default: Date.now, index: true},
        tags: [{type: String}],
        status: {
            type: String,
            enum: ['todo', 'wip', 'done'],
            default: 'todo'
        }
    }
);

module.exports = mongoose.model('TodoItem', TodoItemSchema);
