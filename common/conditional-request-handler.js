const { getFilePath } = require("./file-path-generator");
const { httpResponse } = require("./http-response");
const { handleRangeRequest } = require("./range-request-handler");
const { buildResponseHeaderBuffer } = require("./response-header-buffer-builder");
const { handleBadRequestError } = require("./bad-request-handler");
const { headers } = require("../common/response-header");
const fs = require("fs");
const NOT_MODIFIED_STATUS_CODE = 304;

function handleConditionalRequest(socket, request, service) {
  const ifModifiedSince = request.headers["If-Modified-Since"];
  const filePath = getFilePath(request);

  // ifModifiedSince 헤더가 없는 경우 Range 요청 핸들러에게 request 전달
  if (!ifModifiedSince) handleRangeRequest(socket, request, filePath, service);
  else {
    try {
      const ifModifiedSinceDate = convertStringToDate(ifModifiedSince);
      if (isNaN(ifModifiedSinceDate)) throw new Error("Invaild If-Modified-Since");

      const stat = fs.statSync(filePath);
      const lastMTime = stat.mtime.toUTCString();

      // 리소스가 변경 된 경우 다음 핸들러에게 요청 전달
      if (ifModifiedSinceDate < lastMTime) {
        handleRangeRequest(socket, request, filePath, service);
      } else {
        // 304 Not Modified 처리
        const responseHeader = {
          ...headers,
          "Content-Type": "text/html; charset=UTF-8",
          "Last-Modified": lastMTime,
          "Content-Length": 0,
          Date: Date.now(),
        };

        const buffer = Buffer.alloc(0);
        const headerString = buildResponseHeaderBuffer(NOT_MODIFIED_STATUS_CODE, responseHeader);
        httpResponse(socket, headerString, buffer);
      }
    } catch (error) {
      console.error(`Error in handleConditionalRequest: ${error.message}`);
      handleBadRequestError(socket);
    }
  }
}

function convertStringToDate(dateString) {
  return new Date(dateString);
}

module.exports = { handleConditionalRequest };
