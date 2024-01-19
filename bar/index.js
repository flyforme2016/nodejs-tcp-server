const { redirectRequest } = require("../common/redirect");
const { headers } = require("../common/response-header");
const { httpResponse } = require("../common/http-response");
const fs = require("fs");
const { compressHttp } = require("../common/http-compressor");
const { buildResponseHeaderBuffer } = require("../common/response-header-buffer-builder");
const { combineBuffer } = require("../common/bufferCombiner");
const OK_STATUS_CODE = 200;
/**
 * 응답 본문 및 헤더를 생성하고 HTTP 응답을 전송하는 httpResponse()를 호출하는 서비스.
 * @param {net.socket} socket
 * @param {object} request { method: 'POST', path: '/test.html', version: 'HTTP/1.1', header: [ 'Host: www.bar.com', ...], body: [ '' ] }
 */
function barIndex(socket, request, filePath) {
  const stat = fs.statSync(filePath);
  const file = fs.readFileSync(filePath);
  const fileSize = stat.size;

  const responseHeader = {
    ...headers,
    "Content-Length": fileSize,
    "Content-Type": "text/html; charset=UTF-8",
    "Content-Encoding": "gzip",
    "Last-Modified": stat.mtime,
  };

  compressHttp(responseHeader, file)
    .then(({ header, compressedBodyBuffer }) => {
      const headerBuffer = buildResponseHeaderBuffer(OK_STATUS_CODE, header);
      const response = combineBuffer(headerBuffer, compressedBodyBuffer);
      httpResponse(socket, response);
    })
    .catch((error) => {
      console.error("🚀 ~ fooIndex ~ error:", error);
    });
}

module.exports = { barIndex };
