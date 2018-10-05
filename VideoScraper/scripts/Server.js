/**
 * http://usejsdoc.org/
 */
var http = require('http');

//crea un oggetto server:
http.createServer(function (req, res) {
  res.write('Hello World!');
  res.end(); 
}).listen(8080);