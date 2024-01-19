const { buildResponseHeaderBuffer } = require("./response-header-buffer-builder");
const { httpResponse } = require("./http-response");
const { headers } = require("./response-header");
const fs = require("fs");
const RANGE_NOT_SATISFIABLE_STATUS_CODE = 416;

function handleRangeNotSatisfiableError(socket) {
  const filePath =
    "C:/Users/cjdfi/Desktop/nodejs-tcp-server/common/static/range-not-satisfiable-error.html";
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const file = fs.readFileSync(filePath);

  const responseHeader = {
    ...headers,
    "Content-Length": fileSize,
    "Content-Type": "text/html; charset=UTF-8",
    "Last-Modified": stat.mtime.toUTCString(),
  };

  const headerString = buildResponseHeaderBuffer(RANGE_NOT_SATISFIABLE_STATUS_CODE, responseHeader);
  httpResponse(socket, headerString, file);
}

module.exports = { handleRangeNotSatisfiableError };
