// import each command and place it into an exported object
const formatter = require('./formatter');


module.exports = {
    "greeting": require('./greeting').greeting,
    "random": require('./random').random,
    "createList": formatter.createList

};

