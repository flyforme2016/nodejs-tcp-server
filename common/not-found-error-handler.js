const { buildResponseHeaderBuffer } = require("./response-header-buffer-builder");
const { headers } = require("./response-header");
const { httpResponse } = require("./http-response");
const fs = require("fs");
const NOT_FOUND_STATUS_CODE = 404;

function handleNotFoundError(socket, request) {
  const filePath = "C:/Users/cjdfi/Desktop/nodejs-tcp-server/common/static/not-found-error.html";
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const file = fs.readFileSync(filePath);

  const responseHeader = {
    ...headers,
    "Content-Length": fileSize,
    "Content-Type": "text/html; charset=UTF-8",
    "Last-Modified": stat.mtime.toUTCString(),
  };

  const headerString = buildResponseHeaderBuffer(NOT_FOUND_STATUS_CODE, responseHeader);
  httpResponse(socket, headerString, file);
}

module.exports = { handleNotFoundError };
