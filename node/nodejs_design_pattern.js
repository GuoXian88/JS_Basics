
// zeromq?
var zmp = require('zeromq')
var sink = zmq.socket('pull')
sink.bindSync("tcp://127.0.0.1:3000")

sink.on('message', function(buffer) {
    console.log('Message from worker： ', buffer.toString())
})

//small module, DRY, 实现和接口都应该保持simple并且实现>接口
/*reactor pattern
Pattern (reactor): handles I/O by blocking until new events are
available from a set of observed resources, and then reacting by
dispatching each event to an associated handler.
libuv

nodejs:
core js API (node-core)
Bindings
V8
libuv

goods of closure:
Also, closures are an ideal construct for implementing callbacks.
With closures, we can in fact reference the environment in which a function was
created, practically, we can always maintain the context in which the asynchronous
operation was requested, no matter when or where its callback is invoked.
cps:
In fact, it simply indicates that a result is propagated by
passing it to another function (the callback), instead of directly returning it to the caller.

event-loop image.

//sync event demultiplexer/event notification interface


//event loop

