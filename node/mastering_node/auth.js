//basic auth

http.createServer(function(req, res) {
    let auth = req.headers['authorization'];
    if (!auth) {
        res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Secure Area"' });
        return res.end(
            '<html><body>Please enter some credentials.</body></html>'
        );
    }
    let tmp = auth.split(' ');
    let buf = Buffer.from(tmp[1], 'base64');
    let plain_auth = buf.toString();

    let creds = plain_auth.split(':');
    let username = creds[0];
    // Find this user record
    client.get(username, function(err, data) {
        if (err || !data) {
            res.writeHead(401, {
                'WWW-Authenticate': 'Basic realm="Secure Area"'
            });
            return res.end('<html><body>You are not authorized.</body></html>');
        }
        res.statusCode = 200;
        res.end('<html><body>Welcome!</body></html>');
    });
}).listen(8080);

//sha256
const crypto = require('crypto');
const fs = require('fs');
const express = require('express');
const redis = require('redis');
let app = express();
let client = redis.createClient();
app.get('/authenticate/:username', (request, response) => {
    let publicKey = Math.random();
    let username = request.params.username; // This is always "jack" // ... get jack's data from redis
    client.hgetall(username, (err, data) => {
        if (err || !data) {
            return response.end('no data');
        }
        // Creating the challenge hash
        let challenge = crypto
            .createHash('sha256')
            .update(publicKey + data.password)
            .digest('hex');
        // Store challenge for later match
        client.set(challenge, username);
        response.end(challenge);
    });
});
app.get('/login/:response', (request, response) => {
    let challengehash = request.params.response;
    client.exists(challengehash, (err, exists) => {
        if (err || !exists) {
            return response.end('failed');
        }
    });
    client.del(challengehash, () => {
        response.end('OK');
    });
});

/*JWT(JSON web tokens)token: To initiate a token-based authenticated session a client sends credentials just once, receives a token in exchange, and then sends only that token on subsequent requests, gaining any access that token provides. Incessantly passing around sensitive credentials is no longer required.
*/
function send(route, formData, cb) {
    if (!(formData instanceof FormData)) {
        cb = formData;
        formData = new FormData();
    }
    let caller = new XMLHttpRequest();
    caller.onload = function() {
        cb(JSON.parse(this.responseText));
    };
    caller.open('POST', route);
    token && caller.setRequestHeader('Authorization', 'Bearer ' + token);
    caller.send(formData);
}
formData = new FormData();
formData.append('username', 'sandro');
formData.append('password', 'abcdefg');
send('/login', formData, function(response) {
    token = response.token;
    console.log('Set token: ' + token);
});
