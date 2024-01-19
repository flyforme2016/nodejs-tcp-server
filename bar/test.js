const { headers } = require("../common/response-header");
const { redirectRequest } = require("../common/redirect");
const fs = require("fs");
const { httpResponse } = require("../common/http-response");
const { compressHttp } = require("../common/http-compressor");
const { buildResponseHeaderBuffer } = require("../common/response-header-buffer-builder");
const { combineBuffer } = require("../common/bufferCombiner");
const OK_STATUS_CODE = 200;
/**
 * 응답 http body 및 header를 반환하는 함수
 */
function barTest(socket, request, filePath) {
  const stat = fs.statSync(filePath);
  const file = fs.readFileSync(filePath);
  const fileSize = stat.size;

  const responseHeader = {
    ...headers,
    "Content-Length": fileSize,
    "Content-Type": "text/html; charset=UTF-8",
    "Content-Encoding": "gzip",
    "Last-Modified": stat.mtime.toUTCString(),
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

module.exports = { barTest };
