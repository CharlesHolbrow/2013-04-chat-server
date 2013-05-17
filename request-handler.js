/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var url = require('url');


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  request.setEncoding('utf8');

  var pathname = url.parse(request.url).pathname;

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  response.writeHead(statusCode, headers);

  switch (request.method) {
    case 'GET':
      // For GET, return the messages
      response.end('Fix Me');
      break;
    case 'OPTIONS':
      // For OPTIONS, return the headers, but no body is necessary
      response.end('Fix Me');
      break;
    case 'POST':
      // For POST, and ONLY POST, parse the JSON
      var data = [];

      request.on('data', function(chunk) {
        console.log('DATA event', chunk);
        data.push(chunk);
      });

      request.on('end', function() {
        console.log('------');
        console.log('END event', pathname);

        try {
          var message = JSON.parse(data.join(''));
          console.log('Data:', message);
          // DO something with message
        } catch (error) {
          console.log('JSON.parse Error:', error);
        }
        finally {
          response.end('Fix Me');
        }
      });
      break;
  }
  console.log('Handle classes room1');
};
