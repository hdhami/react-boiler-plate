/* eslint-disable no-console */
const express = require("express");
const compression = require("compression");
const path = require("path");
const ejs = require("ejs");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const { PORT, ROOT_PATH } = require("./config/server-config");
const { pageSource } = require("./config/page-source");
const routes = require("./routes/index");

const clientOuputPath = "../../experience/";

const server = express();

server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors);

const options = {
  key: fs.readFileSync(path.join(`${ROOT_PATH}`, `app/localhost-privkey.pem`)),
  cert: fs.readFileSync(path.join(`${ROOT_PATH}`, `app/localhost-cert.pem`)),
};

server.use(express.static(`${clientOuputPath}`));
server.use(compression());

// view engine setup
server.engine("ejs", ejs.renderFile);
server.set("view engine", "ejs");

server.get("/", (req, res) => {
  const filePath = path.join(`${ROOT_PATH}`, `${pageSource.source}`);
  res.render(path.resolve(filePath), {
    pageSource,
  });
});

// server.get("/api/v1/lists/:list/data", routes.fetchData);

https.createServer(options, server).listen(PORT, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Server running at https://localhost:${PORT}`);
});
