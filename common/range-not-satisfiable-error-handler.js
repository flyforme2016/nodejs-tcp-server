const { serializeHeaders } = require("./serialize-header");
const { httpResponse } = require("./http-response");
const { headers } = require("./response-header");
const fs = require("fs");

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
    "Last-Modified": stat.mtime.getTime(),
  };

  const response = {
    statusCode: 416,
    header: responseHeader,
    body: file,
    lastMTime: stat.mtime.getTime(),
    fileSize: fileSize,
  };
  const headerString = serializeHeaders(response.statusCode, response.header);
  httpResponse(socket, headerString, file);
}

module.exports = { handleRangeNotSatisfiableError };
