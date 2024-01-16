const { getFilePath } = require("./file-path-generator");
const { httpResponse } = require("./http-response");
const { handleRangeRequest } = require("./range-request-handler");
const { serializeHeaders } = require("./serialize-header");
const { headers } = require("../common/response-header");
const fs = require("fs");
const NOT_MODIFIED_STATUS_CODE = 304;

function handleConditionalRequest(socket, request, service) {
  const ifModifiedSince = request.headers["If-Modified-Since"];
  const filePath = getFilePath(request);
  console.log(
    "🚀 ~ file: conditional-request-handler.js:12 ~ handleConditionalRequest ~ filePath:",
    filePath
  );

  // ifModifiedSince 헤더가 없는 경우 다음 핸들러에게 요청 전달
  if (!ifModifiedSince) handleRangeRequest(socket, request, filePath, service);

  const stat = fs.statSync(filePath);
  const lastMTime = stat.mtime;

  // 리소스가 변경 된 경우 다음 핸들러에게 요청 전달
  if (ifModifiedSince < lastMTime) handleRangeRequest(socket, request, filePath, service);

  // 304 Not Modified 처리
  const responseHeader = {
    ...headers,
    "Content-Type": "text/html; charset=UTF-8",
    "Last-Modified": lastMTime.getTime(),
    "Content-Length": 0,
    Date: Date.now(),
  };

  const buffer = Buffer.alloc(0);
  const headerString = serializeHeaders(NOT_MODIFIED_STATUS_CODE, responseHeader);
  httpResponse(socket, headerString, buffer);
}

module.exports = { handleConditionalRequest };
