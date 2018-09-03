/*request header etag
If-None-Match : "686897696a7c876b7e", "923892329b4c796e2e"


Last-Modified
If--Unmodified-Since
*/

let crypto = require('crypto');
let etag = crypto
    .createHash('md5')
    .update(stat.size + stat.mtime)
    .digest('hex');

if (request.headers['if-none-match'] === etag) {
    response.statusCode = 304;
    return response.end();
} else {
    //stream the request
}
