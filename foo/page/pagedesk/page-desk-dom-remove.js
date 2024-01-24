const { httpResponse } = require("../../../common/http-response");
const { buildResponseHeaderBuffer } = require("../../../common/response-header-buffer-builder");
const { headers } = require("../../../common/response-header");
const fs = require("fs");
const { compressHttp } = require("../../../common/http-compressor");
const { combineBuffer } = require("../../../common/bufferCombiner");
const OK_STATUS_CODE = 200;
/**
 * 응답 본문 및 헤더를 생성하고 HTTP 응답을 전송하는 httpResponse()를 호출하는 서비스.
 * @param {net.socket} socket
 * @param {object} request { method: 'POST', path: '/test.html', version: 'HTTP/1.1', header: [ 'Host: www.bar.com', ...], body: [ '' ] }
 */
function pageDeskDomRemove(socket, request, filePath) {
  const stat = fs.statSync(filePath);
  const file = fs.readFileSync(filePath);
  const fileSize = stat.size;

  const responseHeader = {
    ...headers,
    "Content-Length": fileSize,
    "Content-Type": "text/html; charset=UTF-8",
    "Last-Modified": stat.mtime.toUTCString(),
  };

  const headerBuffer = buildResponseHeaderBuffer(OK_STATUS_CODE, responseHeader);
  const response = combineBuffer(headerBuffer, file);
  httpResponse(socket, response);
}

module.exports = { pageDeskDomRemove };
