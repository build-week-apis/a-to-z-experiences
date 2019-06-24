const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const configureRoutes = require("../config/routes.js");

server.use(helmet());
server.use(cors());
server.use(express.json());

configureRoutes(server);

// sanity check
server.get("/", (req, res) => {
  res.send(`<h2> I'm runninnnnnnnnnnn</h2>`);
});

module.exports = server;
