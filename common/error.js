const { serializeHeaders } = require("./serialize-header");
const { headers } = require("../common/response-header");
const { httpResponse } = require("../common/http-response");
const fs = require("fs");

function response404(socket, request) {
  let filePath = "C:/Users/cjdfi/Desktop/ws2/common/static/not-found-error.html";

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  let file = fs.readFileSync(filePath);

  let responseHeader = headers;
  responseHeader["Content-Length"] = fileSize;
  responseHeader["Content-Type"] = "text/html; charset=UTF-8";

  let response = {
    statusCode: 404,
    header: responseHeader,
    body: file,
    fileSize: fileSize,
  };
  httpResponse(socket, request, response);
}

module.exports = { response404 };
