var http = require('http'),
fs = require('fs');

var htmlFile;

fs.readFile('../Web/index.html', function(err, data) {
    if (err){
        throw err;
    }
    htmlFile = data;
});

var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(htmlFile);
    response.end();
}).listen(8080);
