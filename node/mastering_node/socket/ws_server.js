let SocketServer = require('ws').Server;
let wss = new SocketServer({ port: 8080 });
wss.on('connection', ws => {
    ws.on('message', message => {
        console.log('received: %s', message);
    });
    ws.send("You've connected!");
});
