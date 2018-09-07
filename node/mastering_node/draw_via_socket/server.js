// const io = require('socket.io').listen(8080);

var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server('./public');

require('http')
    .createServer(function(request, response) {
        request
            .addListener('end', function() {
                //
                // Serve files!
                //
                file.serve(request, response);
            })
            .resume();
    })
    .listen(8080);

// io.sockets.on('connection', socket => {
//     let id = socket.id;
//     socket.on('mousemove', data => {
//         data.id = id;
//         socket.broadcast.emit('moving', data);
//     });

//     socket.on('disconnect', () => {
//         socket.broadcast.emit('clientdisconnect', id);
//     });
// });
