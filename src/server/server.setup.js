const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const mongooseSetup = require('./mongoose.setup');
const apiRouter = require('./api');

const app = express();

mongooseSetup.connect();

app.use(helmet.hsts({ maxAge: 15552000 }));
app.use(compression({}));
app.use(bodyParser.urlencoded({ limit: 2048000, extended: false }));
app.use(bodyParser.json({ limit: 2048000 }));
let client_path = path.join(__dirname, "..", "client");
app.use("/", express.static(client_path));

app.use("/api", apiRouter);
app.get("/hello", (req, res) => res.send("Hello World!"));

module.exports = app
