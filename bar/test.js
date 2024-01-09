const { serializeResponse } = require("../common/serialize-header");
const { httpResponse } = require("../common/http-response");
const { redirectRequest } = require("../common/redirect");
const { headers } = require("../common/response-header");
const fs = require("fs");
/**
 * 응답 http body 및 header를 반환하는 함수
 */
function barTest(socket, request) {
  let filePath = "C:/Users/cjdfi/Desktop/ws2/bar/static/test.html";
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  let statusCode = "200 OK";
  let responseHeader = headers;

  // 범위 요청이 아닌 경우 200 OK 상태 코드로 파일 전체를 전송.
  const fileStream = fs.createReadStream(filePath);
  responseHeader["Content-Length"] = fileSize;
  responseHeader["Content-Type"] = "text/html; charset=UTF-8";
  // ({ statusCode, file, responseHeader } = redirectRequest(socket, request, "/test.html"));
  httpResponse(socket, serializeResponse(statusCode, responseHeader), fileStream);
}

module.exports = { barTest };
