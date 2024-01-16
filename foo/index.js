const { handleConditionalRequest } = require("../common/conditional-request-handler");
const { redirectRequest } = require("../common/redirect");
const { headers } = require("../common/response-header");
const fs = require("fs");
/**
 * 응답 본문 및 헤더를 생성하고 HTTP 응답을 전송하는 httpResponse()를 호출하는 서비스.
 * @param {net.socket} socket
 * @param {object} request { method: 'POST', path: '/test.html', version: 'HTTP/1.1', header: [ 'Host: www.bar.com', ...], body: [ '' ] }
 */
function fooIndex(socket, request) {
  const filePath = "C:/Users/cjdfi/Desktop/ws2/foo/static/index.html";
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const file = fs.readFileSync(filePath);

  const responseHeader = {
    ...headers,
    "Content-Length": fileSize,
    "Content-Type": "text/html; charset=UTF-8",
    "Last-Modified": stat.mtime.getTime(),
  };

  const response = {
    statusCode: 200,
    header: responseHeader,
    body: file,
    lastMTime: stat.mtime.getTime(),
    fileSize: fileSize,
  };
  // response = redirectRequest(socket, request, "/test.html");
  handleConditionalRequest(socket, request, response);
}

module.exports = { fooIndex };
