const { headers } = require("../common/response-header");
const { redirectRequest } = require("../common/redirect");
const fs = require("fs");
const { serializeHeaders } = require("../common/serialize-header");
const { httpResponse } = require("../common/http-response");
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
    "Last-Modified": stat.mtime.toUTCString(),
  };

  // response = redirectRequest(socket, request, "/test.html");
  const headerString = serializeHeaders(OK_STATUS_CODE, responseHeader);
  httpResponse(socket, headerString, file);
}

module.exports = { barTest };
