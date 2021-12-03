const app = require('../server/server.setup');
const mongooseSetup = require('../server/mongoose.setup');
const http = require('http');

class MockServer {
    constructor() {
        this.app = app;
        this.server = http.Server(this.app);
        this.port = 3001;
    }

    listen() {
        return new Promise((resolve, reject) => {
            this.server.listen(this.port, () => {
                console.log('server listening on: ' + this.port);
                resolve();
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.server.close(() => {
                mongooseSetup.close();
                console.log('server close');
                resolve();
            });
        });
    }
}

module.exports = new MockServer();