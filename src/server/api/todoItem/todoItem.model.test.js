/* global expect, beforeAll, afterAll */

const mongoHelper = require('../../../test/mockData');
const todoItemData = require('../../../test/mockData/todoItems');
const todoItem = require('./todoItem.model');

beforeAll(() => {
    mongoHelper.connect();
    return Promise.all([
        mongoHelper.removeAll()
    ]);
});


describe('test todoItem model', () => {
    const itemData = todoItemData.item1;

    it('should create todo item correctly', (done) => {
        todoItem.create(itemData).then((item) => {
            expect(item.title).toEqual(itemData.title);
            expect(item.description).toEqual(itemData.description);
            expect(item.expiredAt).toEqual(new Date(itemData.expiredAt));
            expect(Array.from([...item.tags])).toEqual(itemData.tags);
            expect(item.status).toEqual(itemData.status);
            expect(item.isArchived).toEqual(!!itemData.isArchived);
            done();
        });
    });
});

afterAll(() => Promise.all([
    mongoHelper.close()
]));
