const { serializeHeaders } = require("./serialize-header");
const { httpResponse } = require("./http-response");
const { headers } = require("./response-header");
const fs = require("fs");
const BAD_REQUEST_STATUS_CODE = 400;

function handleBadRequestError(socket) {
  const filePath = "C:/Users/cjdfi/Desktop/nodejs-tcp-server/common/static/bad-request-error.html";
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const file = fs.readFileSync(filePath);

  const responseHeader = {
    ...headers,
    "Content-Length": fileSize,
    "Content-Type": "text/html; charset=UTF-8",
    "Last-Modified": stat.mtime.toUTCString(),
  };

  const headerString = serializeHeaders(BAD_REQUEST_STATUS_CODE, responseHeader);
  httpResponse(socket, headerString, file);
}

module.exports = { handleBadRequestError };
