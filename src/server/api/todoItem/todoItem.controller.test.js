
   
/* global expect, beforeAll, afterAll, jest */

'use strict';
process.env.NODE_ENV = 'test';

const request = require('supertest');

const mockServer = require('../../../test/mockServer');


const sendPostRequest = (uri, expectedStatus, body = {}) => {
    return request(mockServer.app)
        .post(uri)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(body)
        .expect(expectedStatus);
};


beforeAll(() => mockServer.listen());

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

afterAll(() => mockServer.close());
