const { httpResponse } = require("../common/http-response");
const { headers } = require("../common/response-header");
const fs = require("fs");
/**
 * 응답 http body 및 header를 반환하는 함수
 */
function fooTest(socket, request) {
  let filePath = "C:/Users/cjdfi/Desktop/ws2/foo/static/test.html";
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  let file = fs.readFileSync(filePath);

  let responseHeader = headers;

  responseHeader["Content-Length"] = fileSize;
  responseHeader["Content-Type"] = "text/html; charset=UTF-8";

  let response = {
    statusCode: 200,
    header: responseHeader,
    body: file,
    fileSize: fileSize,
  };
  httpResponse(socket, request, response);
}

module.exports = { fooTest };
