
   
/* global expect, beforeEach, afterEach, jest */

const request = require('supertest');

const mockServer = require('../../../test/mockServer');
const mongoHelper = require('../../../test/mockData');
const todoItemData = require('../../../test/mockData/todoItems')


const sendPostRequest = (uri, expectedStatus, body = {}) => {
    return request(mockServer.app)
        .post(uri)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(body)
        .expect(expectedStatus);
};

const sendGetRequest = (uri, expectedStatus, query = {}) => {
    return request(mockServer.app)
        .get(uri)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .query(query)
        .expect(expectedStatus);
};


beforeEach(() => {
    mongoHelper.connect();
    return Promise.all([
        mongoHelper.removeAll(),
        mockServer.listen(),
    ]).then(() => mongoHelper.createTestTodoItems())
});

describe('test create todo item', () => {
    const uri = '/api/todoItem';
    const data = {
        title: 'test',
        description: "really serious",
        expiredAt: "2021-11-12",
        status: 'wip',
        tags: ["test2", "test4"]
    };

    it('should create successfully', () => {
        let payload = Object.assign({}, data);
        return sendPostRequest(uri, 201, payload);
    });

    it('should not create item due to absence of title', () => {
        let payload = Object.assign({}, data);
        delete payload.title
        return sendPostRequest(uri, 400, payload);
    });

    it('should not create item due to invalid status', () => {
        let payload = Object.assign({}, data);
        payload.status = 'random_wrong_status'
        return sendPostRequest(uri, 400, payload);
    });

    it('should not create item due to tag is an empty array', () => {
        let payload = Object.assign({}, data);
        payload.tags = Array();
        return sendPostRequest(uri, 400, payload);
    });
});


describe('test get todo items', () => {
    const uri = '/api/todoItem';
    const data = Object.values(todoItemData);

    it('should get all items successfully', () => {
        return sendGetRequest(uri, 200, {}).then((res) => {
            const count = data.length;
            expect(res.body.length).toEqual(count);
        });
    });

    it('should get all items that has specified tag', () => {
        const tag = 'tag1';
        return sendGetRequest(uri, 200, { tag }).then((res) => {
            const count = data.filter((item) => item.tags.includes(tag)).length;
            expect(res.body.length).toEqual(count);
        });
    });

});

afterEach(() => Promise.all([
    mockServer.close(),
    mongoHelper.close(),
]));
