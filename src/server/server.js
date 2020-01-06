import express from "express";
import path from "path";
import compression from "compression";
import helmet from "helmet";
import bodyParser from "body-parser";
import mongooseSetup from "./mongoose.setup";
import apiRouter from "./api";

const app = express();
const port = 3000;

mongooseSetup();

app.use(helmet.hsts({ maxAge: 15552000 }));
app.use(compression({}));
app.use(bodyParser.urlencoded({ limit: 2048000, extended: false }));
app.use(bodyParser.json({ limit: 2048000 }));
let client_path = path.join(".", "dist", "client");
app.use("/", express.static(client_path));
console.log(client_path);


app.use("/api", apiRouter);
app.get("/hello", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
