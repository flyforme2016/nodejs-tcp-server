const { httpResponse } = require("./http-response");
const { headers } = require("./response-header");
const { serializeHeaders } = require("./serialize-header");
const REDIRECT_STATUS_CODE = 302;
/**
 * 응답 http body 및 header를 반환하는 함수
 */
function redirectRequest(socket, request, redirectPath) {
  const responseHeader = {
    ...headers,
    "Content-Type": "text/html; charset=UTF-8",
    "Content-Length": 0,
    Location: redirectPath,
    Date: Date.now(),
  };

  const buffer = Buffer.alloc(0);
  const headerString = serializeHeaders(REDIRECT_STATUS_CODE, responseHeader);
  httpResponse(socket, headerString, buffer);
}

module.exports = { redirectRequest };
