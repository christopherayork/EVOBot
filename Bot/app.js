const Discord = require("discord.js");
require("dotenv").config(); // no return, loads into process.env
const client = new Discord.Client();
const ENV = process.env;
const COMMANDS = require('./commands');

const READY = "ready";
const MESSAGE = "message";
var SYNTAX = {
    prefix: "!",
    suffix: "!"
};

// var COMMANDS = {
//     "greeting": (msg) => `Hello, ${msg.author ? msg.author.username : "unidentified"}!`,
//     "random": () => Math.random() * 100,
//     "createList": (msg) => {
//         return "stuff"; // placeholder
//     },
// };

function getCMDKey(text) {
    const cmdIndexPre = text.indexOf(SYNTAX.prefix);
    if(cmdIndexPre === -1) return ""; // no command
    const cmdIndexSuf = text.indexOf(SYNTAX.suffix, cmdIndexPre + 1); // start after pre match
    if(cmdIndexSuf === -1) return ""; // no command without suffix
    return text.slice(cmdIndexPre + SYNTAX.prefix.length, cmdIndexSuf);
}

function getCMD(text) {
    let key = getCMDKey(text);
    return COMMANDS[key];
}


// setup development hooks
client.on(READY, () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on(MESSAGE, msg => {
    const msgContent = msg.content.toLowerCase();
    let action = getCMD(msg.content);
    if(action) {
        let response = action(msg);
        msg.channel.send(response);
    }
});

client.login(ENV.BOT_TOKEN); // front .env file