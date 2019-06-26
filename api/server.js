const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const configureRoutes = require("../config/routes.js");

server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use(express.json());

configureRoutes(server);

module.exports = server;
