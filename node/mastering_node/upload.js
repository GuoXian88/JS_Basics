const http = require('http');
http.createServer((request, response) => {
    let rm = request.method.toLowerCase();
    if (request.url === '/uploads' && rm === 'post') {
        let form = new formidable.IncomingForm();
        form.uploadDir = process.cwd();
        let resp = '';
        form.on('file', (field, File) => {
            resp += `File: ${File.name}<br />`;
        })
            .on('field', (field, value) => {
                resp += `${field}: ${value}<br />`;
            })
            .on('end', () => {
                response.writeHead(200, { 'content-type': 'text/html' });
                response.end(resp);
            })
            .parse(request);
        return;
    }
}).listen(8000);
