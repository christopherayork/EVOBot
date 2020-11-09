const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

const corsConfig = {

};

server.use(helmet());
server.use(express.json());
server.use(cors(corsConfig));

module.exports = server;