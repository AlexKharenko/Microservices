const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  

  res.end('Hello from service2');

}

const server = http.createServer(requestListener);
server.listen(3000);
// http://localhost:8001/api/v1/namespaces/default/services/client-service/proxy/hello
