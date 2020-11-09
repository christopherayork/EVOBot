const express = require("express");
const server = require("./routes/router");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MDB_CONNECTION, { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('We\'re open!'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT} ..`);
});