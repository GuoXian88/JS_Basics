function* range(start = 1, end = 2) {
    do {
        yield start;
    } while (++start < end);
}

for (let num of range(1, 3)) {
    console.log(num);
}

/*The	run/halt	(not	run/stop)	design	of	Generators	means	that	we	can	think	of
iteration	not	as	running	through	a	list,	but	of	capturing	a	set	of	transition	events
over	time.	This	idea	is	central	to	the	idea	of	Reactive	Programming	(https://en.wikipedia.org/wiki/Reactive_programming)

	Generators	are	to	a	sequence	of	future	values
as	Promises	are	to	a	single	future	value.	Both	Promises	and	Generators	can	be
passed	around	the	instant	they	are	generated	(even	if	some	eventual	values	are
still	resolving,	or	haven't	yet	been	queued	for	resolution),	with	one	getting	values
via	the	next()	interface,	and	the	other	via	the	then()	interface.

Consider	using	finite	state	machines	for	managing	your	events.	State
machines	are	surprisingly	under-represented	in	JavaScript	codebases.	When
a	callback	re-enters	program	flow,	it	has	likely	changed	the	state	of	your
application,	and	the	issuing	of	the	asynchronous	call	itself	is	a	likely
indicator	that	state	is	about	to	change


streams
Streams	are	required	because	files	are	big.


*/

//copy file

const fs = require('fs');

console.log('Copying...');
let block = fs.readFileSync('source.bin');
console.log('Size: ' + block.length);
fs.writeFileSync('destination.bin', block);
console.log('Done.');

/*
stream interface
*/
//eg1
const stream = require('stream');

let Feed = function(channel) {
    let readable = new stream.Readable({});
    let news = ['Big Win!', 'Stocks Down!', 'Actor Sad!'];
    readable._read = () => {
        if (news.length) {
            return readable.push(news.shift() + '\n');
        }
        readable.push(null); // end event
    };
    return readable;
};

let feed = new Feed();
feed.on('readable', () => {
    let data = feed.read();
    data && process.stdout.write(data);
});

feed.on('end', () => {
    console.log('No more news');
});

//eg2 writable stream
const stream = require('stream');

let writable = new stream.Writable({ decodeStrings: false });
writable._write = (chunk, encoding, callback) => {
    console.log(chunk.toString());
    callback();
};

let written = writable.write(Buffer.alloc(16384, 'A')); //超过Buffer最大值 16K为highWaterMark默认值
writable.end();

console.log(written); //false 后不能再发送data了 等drain事件才能再发

//eg3 drain event

const stream = require('stream');

let writable = new stream.Writable({ highWaterMark: 10 });
writable._write = (chunk, encoding, callback) => {
    process.stdout.write(chunk);
    callback();
};

function writeData(iterations, writer, data, encoding, cb) {
    (function write() {
        if (!iterations--) {
            return cb();
        }
        if (!writer.write(data, encoding)) {
            console.log(`<wait> highWaterMark of ${writable.writableHighWaterMark} reached`);
            writer.once('drain', write);
        }
    })();
}

writeData(4, writable, 'String longer than hightWaterMark', 'utf-8', () => console.log('finished!'));

//eg4 duplex stream
const stream = require('stream');
const net = require('net');

net.createServer(socket => {
    socket.write('go ahead and type...');
    socket.setEncoding('utf-8');
    socket.on('readable', function() {
        process.stdout.write(this.read());
    });
}).listen(8080);

//eg5 transform
const stream = require('stream');
let converter = new stream.Transform();

converter._transform = function(num, encoding, cb) {
    this.push(String.fromCharCode(new Number(num)) + '\n');
    cb();
};

process.stdin.pipe(converter).pipe(process.stdout);

//eg6 http request
const http = require('http');

http.request(
    {
        host: 'www.example.org',
        method: 'GET',
        path: '/'
    },
    function(response) {
        response.setEncoding('utf-8');
        console.log(`Status:${response.statusCode}`); //200
        response.on('readable', () => {
            console.log(response.read());
        });
    }
).end();

//eg7
const http = require('http');
const server = new http.Server();
//本地代理服务器
server.on('request', (request, socket) => {
    console.log(request.url);
    http.request(
        {
            host: 'www.example.org',
            method: 'GET',
            path: '/',
            port: 80
        },
        function(response) {
            response.pipe(socket);
        }
    ).end();
});

server.listen(8080, () => console.log('proxy server listening on localhost:8080'));
