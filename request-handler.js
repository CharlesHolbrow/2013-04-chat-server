/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var url = require('url');
var querystring = require('querystring');

var rooms = {
  '/classes/room': [],
  '/classes/room1': []
};

var db = [];

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
  var search = url.parse(request.url).search;
  var query = querystring.parse(search);
  console.log(query);

  var statusCode = 500;
  var headers = defaultCorsHeaders;
  var data;
  headers['Content-Type'] = "application/json";

  switch (request.method) {
    case 'GET':
      // For GET, return the messages
      statusCode = (rooms[pathname]) ? 200 : 404;
      data = rooms[pathname] || [];
      data = data.slice(~~query['?skip']);
      console.log('GET:', statusCode, pathname);
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results:data}));
      break;
    case 'OPTIONS':
      // For OPTIONS, return the headers, but no body is necessary
      headers['Allow'] = 'GET, OPTIONS, POST';
      response.writeHead(200, headers);
      response.end('');
      break;
    case 'POST':
      // For POST, and ONLY POST, parse the JSON
      var postData = [];
      var answerMessage;

      request.on('data', function(chunk) {
        console.log('DATA event', chunk);
        postData.push(chunk);
      });

      request.on('end', function() {
        console.log('------');
        console.log('POST request to:', pathname);

        try {
          var message = JSON.parse(postData.join(''));
          console.log('Data:', message);
          rooms[pathname] = rooms[pathname] || [];
          rooms[pathname].push(message);
          response.writeHead(201, headers);
          answerMessage = JSON.stringify('\n');
        } catch (error) {
          console.log('JSON.parse Error:', error);
          response.writeHead(400, headers);
          answerMessage = JSON.stringify('POST Error. Bad JSON?');
        }
        finally {
          response.end(answerMessage);
        }
      });
      break;
  }
  console.log('Handle classes room1');
};
