/*coding with streams
buffer:For an input operation, the buffer mode causes all the data coming
from a resource to be collected into a buffer; it is then passed to a callback as soon as the entire resource is read.

composability

*/

var zlib = require('zlib')
var file  = process.argv[2]

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(file + '.gz'))
    .on('finish', function(){
        console.log('File successfully compressed')
    })

var server = http.createServer(function(req, res) {
    var filename = req.headers.filename
    console.log('File request received: ' + filename)
    req
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(filename))
        .on('finish', function() {
            res.writeHead(201, { 'Content-Type' : 'text/plain' })
            res.send('That\'s it\n')
            console.log('File saved: ' + filename)
        })
})

server.listen(3000, function(){
    console.log('Listening')
})


/*When instead we are using
streams, the assembly line is kicked off as soon as we receive the first chunk of data,
without waiting for the entire file to be read. But more amazingly, when the next
chunk of data is available, there is no need to wait for the previous set of tasks to be
completed; instead, another assembly line is launched in parallel. This works perfectly
because each task that we execute is asynchronous, so it can be parallelized by Node.
js; the only constraint is that the order in which the chunks arrive in each stage must
be preserved (and Node.js streams take care of this for us).
Each stream class is also an instance of EventEmitter.

Binary mode
Object mode

These two operating modes allow us to use streams not only for I/O, but also as a tool to elegantly compose processing units in a functional fashion

