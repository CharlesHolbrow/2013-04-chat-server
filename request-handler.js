/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var handleAnyRequest = function(request, response) {
  var data = [];

  request.on('data', function(chunk) {
    console.log('DATA event', chunk);
    data.push(chunk);
  });

  request.on('end', function() {
    console.log('END event (/classes/room1)');
    console.log(data);
  });

  console.log('Handle classes room1');
};


var routes = {
  '/classes/room1': handleAnyRequest,
  '/classes/room' : handleAnyRequest
};


exports.handleRequest = function(request, response) {

  if (routes[request.url]) {
    routes[request.url](request, response);
  } else {
    response.end('THIS SHOULD BE A 404');
  }
};
