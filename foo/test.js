const { handleConditionalRequest } = require("../common/conditional-request-handler");
const { headers } = require("../common/response-header");
const { redirectRequest } = require("../common/redirect");
const fs = require("fs");
/**
 * 응답 http body 및 header를 반환하는 함수
 */
function fooTest(socket, request) {
  const filePath = "C:/Users/cjdfi/Desktop/nodejs-tcp-server/foo/static/test.html";
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
    statusCode: 200,
    header: responseHeader,
    body: file,
    lastMTime: stat.mtime.getTime(),
    fileSize: fileSize,
  };
  // response = redirectRequest(socket, request, "/test.html");
  handleConditionalRequest(socket, request, response);
}

module.exports = { fooTest };
