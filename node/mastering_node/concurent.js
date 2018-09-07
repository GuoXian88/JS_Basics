/*"Concurrency is a way to structure a thing so that you can, maybe, use parallelism to do a better job. But parallelism is not the goal of concurrency; concurrency's goal is a good structure."


Instead, the idea is to move responsibility for implementing efficient parallel processing away from the developer and into the core design of the system, leaving the developer free to structure concurrency through a simple and predictable callback system, safe from deadlocks and other traps.

Routes map URLs to actions.Rather than constructing an application interface in terms of URL paths to specific files that contain some logic, designing with routes involves assigning a specific function to a distinct combination of a URL path and request method. 


*/

//get请求 /listCities/usa/ohio

//regexp

let r = /^\/listCities\/([^\/\.]+)\/([^\/\.]+)\/?$/;
const http = require('http');
let app = http.createServer((request, response) => {
    let url = request.url;
    let method = request.method;
    if (method === 'GET') {
        let match = request.url.match(r);

        if (match) {
            database.call(match[1], match[2], (err, data) => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                // Return list of cities in Ohio, USA
                response.end(JSON.stringify(data));
            });
        }
    }
});

//using express

const express = require('express');
let app = express();
app.get('/listCities/:country/:state', (request, response) => {
    let country = request.params.country;
    let state = request.params.state;
    response.end(`You asked for country: ${country}and state: ${state}`);
});
app.listen(8080);

//middleware
let authenticate = (request, response, next) => {
    if (validUser) {
        next();
    } else {
        response.end('INVALID USER!');
    }
};
app.get('/listCities/:country/:state', authenticate, (request, response) => {
    //...
});

//redis and memcached : in memory key:value database
//保存客户端状态
let redis = require('redis');
let client = redis.createClient();
client.set('userId', 'jack', err => {
    client.get('userId', (err, data) => {
        console.log(data); // "jack"
    });
});

/*cookie定义
A server, when returning an HTTP object to a client, may also send a piece of state information which the client will store. Included in that state object is a description of the range of URLs for which that state is valid. Any future HTTP requests made by the client which fall in that range will include a transmittal of the current value of the state object from the client back to the server. The state object is called a cookie, for no compelling reason.

*/

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.get('/mycookie', (request, response) => {
    response.end(request.cookies.node_cookie);
});
app.get('/', (request, response) => {
    response.cookie('node_cookie', parseInt(Math.random() * 10e10));
    response.end('Cookie set');
});
app.listen(8080);

//long poll
function longPoll() {
    $.get('http://localhost:2112/poll', data => {
        $('<li>' + data + '</li>').appendTo('#results');
        longPoll();
    });
}

longPoll();

const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const receiver = redis.createClient();
const publisher = redis.createClient();
const app = express();
app.use(cookieParser());
let connections = {};
app.get('/poll', (request, response) => {
    let id = request.cookies.node_poll_id;
    if (!id) {
        return;
    }
    connections[id] = response;
});
app.get('/', (request, response) => {
    fs.readFile('./poll_client.html', (err, data) => {
        //设置cookie
        response.cookie(
            'node_poll_id',
            Math.random()
                .toString(36)
                .substr(2, 9)
        );
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data);
    });
});
app.listen(2112);
receiver.subscribe('stdin_message');
receiver.on('message', (channel, message) => {
    let conn;
    for (conn in connections) {
        connections[conn].end(message);
    }
    console.log(`Received message: ${message} on channel: ${channel}`);
});
process.stdin.on('readable', function() {
    let msg = this.read();
    msg && publisher.publish('stdin_message', msg.toString());
});
