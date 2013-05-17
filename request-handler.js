/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var url = require('url');

exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var pathname = url.parse(request.url).pathname;

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  response.writeHead(statusCode, headers);

  var data = [];

  request.on('data', function(chunk) {
    console.log('DATA event', chunk);
    data.push(chunk);
  });

  request.on('end', function() {
    console.log('------');
    console.log('END event', pathname);
    console.log('Data:', data);
    response.end('Fix Me');
  });

  console.log('Handle classes room1');
};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};