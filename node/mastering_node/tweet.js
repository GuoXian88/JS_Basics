let fs = require('fs');
let http = require('http');

let theUser = null;
let userPos = 0;
let tweetFile = 'tweets.txt';

http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    });

    theUser = response;

    response.write(':' + Array(2049).join('') + '\n');
    response.write('retry:2000\n');

    response.socket.on('close', () => {
        theUser = null;
    });
}).listen(8080);

//send client message, 通过fd读到buffer, 140bytes再写进theUser/response
let sendNext = function(fd) {
    let buffer = Buffer.alloc(140);
    fs.read(fd, buffer, 0, 140, userPos * 140, (err, num) => {
        if (!err && num > 0 && theUser) {
            ++userPos;
            theUser.write(`data: ${buffer.toString('utf-8', 0, num)}\n\n`);
            //一直读到没有数据为止
            return process.nextTick(() => {
                sendNext(fd);
            });
        }
    });
};

//poll直到tweetFile存在
function start() {
    fs.open(tweetFile, 'r', (err, fd) => {
        if (err) {
            return setTimeout(start, 1000);
        }
        //watch文件改动
        fs.watch(tweetFile, (event, filename) => {
            if (event == 'change') {
                sendNext(fd);
            }
        });
    });
}

start();

// cnpm install twit
// create a process to write new data to file

const Twit = require('twit');
let writeStream = fs.createWriteStream(tweetFile, {
    flags: 'a' //indicate that we want to append to the file
});

let twit = new Twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
});

let cleanBuffer = function(len) {
    let buf = Buffer.alloc(len);
    buf.fill('\0');
    return buf;
};

let check = function() {
    twit.get(
        'search/tweets',
        {
            q: '#nodejs since:2018-07-01'
        },
        (err, reply) => {
            let buffer = cleanBuffer(reply.statuses.length * 140);
            reply.statuses.forEach((obj, idx) => {
                buffer.write(obj.text, idx * 140, 140);
            });
            writeStream.write(buffer);
        }
    );
    setTimeout(check, 10000);
};

check();
