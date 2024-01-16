const { serializeHeaders } = require("./serialize-header");
const { headers } = require("./response-header");
const { httpResponse } = require("./http-response");
const fs = require("fs");

function handleNotFoundError(socket, request) {
  const filePath = "C:/Users/cjdfi/Desktop/nodejs-tcp-server/common/static/not-found-error.html";
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
    statusCode: 404,
    header: responseHeader,
    body: file,
    lastMTime: stat.mtime.getTime(),
    fileSize: fileSize,
  };
  const headerString = serializeHeaders(response.statusCode, response.header);
  httpResponse(socket, headerString, file);
}

module.exports = { handleNotFoundError };
