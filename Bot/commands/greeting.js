exports.greeting = (msg) => `Hello, ${msg.author ? msg.author.username : "unidentified"}!`;