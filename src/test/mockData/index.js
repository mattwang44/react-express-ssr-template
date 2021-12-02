
const mongooseSetup = require('../../server/mongoose.setup');

const todoItem = require('../../server/api/todoItem/todoItem.model');
const todoItemData = require('./todoItems');

class MongoHelper {
    constructor() {}

    connect() {
        return mongooseSetup.connect();
    }

    removeAll() {
        return Promise.all([
            todoItem.deleteMany(),
        ]);
    }

    createTestTodoItems() {
        return todoItem.create(Object.values(todoItemData));
    }

    close() {
        return mongooseSetup.close();
    }
}

module.exports = new MongoHelper();