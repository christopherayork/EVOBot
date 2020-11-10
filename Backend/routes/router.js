const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const creatureRouter = require("./creatures");

const corsConfig = {

};

server.use(helmet());
server.use(express.json());
server.use(cors(corsConfig));

server.use("/creature", creatureRouter);

module.exports = server;