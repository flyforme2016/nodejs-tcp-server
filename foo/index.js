const { httpResponse } = require("../common/http-response");
const { redirectRequest } = require("../common/redirect");
const { headers } = require("../common/response-header");
const fs = require("fs");
/**
 * 응답 본문 및 헤더를 생성하고 HTTP 응답을 전송하는 httpResponse()를 호출하는 서비스.
 * @param {net.socket} socket
 * @param {object} request { method: 'POST', path: '/test.html', version: 'HTTP/1.1', header: [ 'Host: www.bar.com', ...], body: [ '' ] }
 */
function fooIndex(socket, request) {
  let filePath = "C:/Users/cjdfi/Desktop/ws2/foo/static/index.html";
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  let file = fs.readFileSync(filePath);

  let responseHeader = headers;

  responseHeader["Content-Length"] = fileSize;
  responseHeader["Content-Type"] = "text/html; charset=UTF-8";

  let response = {
    statusCode: 200,
    header: responseHeader,
    body: file,
    fileSize: fileSize,
  };
  response = redirectRequest(socket, request, "/test.html");
  httpResponse(socket, request, response);
}

module.exports = { fooIndex };
