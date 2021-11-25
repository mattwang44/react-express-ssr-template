const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const mongooseSetup = require('./mongoose.setup');
const apiRouter = require('./api');

const app = express();
const port = 3000;

mongooseSetup();

app.use(helmet.hsts({ maxAge: 15552000 }));
app.use(compression({}));
app.use(bodyParser.urlencoded({ limit: 2048000, extended: false }));
app.use(bodyParser.json({ limit: 2048000 }));
let client_path = path.join(".", "dist", "client");
app.use("/", express.static(client_path));

app.use("/api", apiRouter);
app.get("/hello", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`app listening on port ${port}!`));
