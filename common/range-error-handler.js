const { serializeResponse } = require("./serialize-header");
const { httpResponse } = require("../common/http-response");
const { headers } = require("../common/response-header");
const fs = require("fs");

function handleRangeError(socket) {
  const statusCode = "500 Internal Server Error";
  const errorFilePath = "C:/Users/cjdfi/Desktop/ws2/common/static/range-error.html";
  const fileSize = fs.statSync(errorFilePath).size;

  const fileStream = fs.createReadStream(errorFilePath);

  let responseHeader = headers;
  responseHeader["Content-Length"] = fileSize;
  responseHeader["Content-Type"] = "text/html; charset=UTF-8";

  httpResponse(socket, serializeResponse(statusCode, responseHeader), fileStream);
}

module.exports = { handleRangeError };
