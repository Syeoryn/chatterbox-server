var results = [];
exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCodes = {
    GET: 200,
    POST: 201
  };
  var httpRequest = {
    GET: get,
    POST: post
  };

  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCodes[request.method], defaultCorsHeaders);

  var res = httpRequest[request.method](request,response);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  response.end(res);
};

var post = function(request, response) {
  results.push(request._postData);
  return true;
};

var get = function(request, response) {
  var res = {'results': results};
  return JSON.stringify(res);
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  // Previously in handleRequest function...
  "Content-Type": "text/plain"
};
