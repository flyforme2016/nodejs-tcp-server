const { response404 } = require("../common/error");
const { serviceMap } = require("./service-map");
/**
 * 206 handelr 호출
 * @param {net.socket} socket
 * @param {string} request {
  method: 'POST',
  path: '/test.html',
  version: 'HTTP/1.1',
  header: [
    'Host: www.bar.com',
    'User-Agent: PostmanRuntime/7.36.0',
    'Postman-Token: 54ecef74-b7f4-4236-aabe-c01076ccd234',
    'Accept-Encoding: gzip, deflate, br',
    'Connection: keep-alive'
  ],
  body: [ '' ]
}
 */
function fooHandler(socket, request) {
  const service = serviceMap.get(request.path);
  console.log("🚀 ~ fooHandler ~ request.path:", request.path);
  if (service) {
    service(socket, request);
  } else {
    response404(socket, request);
  }
}

module.exports = { fooHandler };
