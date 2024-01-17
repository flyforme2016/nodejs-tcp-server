const { headers } = require("../common/response-header");
const { httpResponse } = require("./http-response");
const { handleRangeNotSatisfiableError } = require("./range-not-satisfiable-error-handler");
const { serializeHeaders } = require("./serialize-header");
const fs = require("fs");
const PARTIAL_CONTENT_STATUS_CODE = 206;

function handleRangeRequest(socket, request, filePath, service) {
  const range = request.headers["Range"];
  // 다음 핸들러에게 요청 전달
  if (!range) {
    service(socket, request, filePath);
  } else {
    // 206 Partial Content 처리
    const stat = fs.statSync(filePath);
    let file = fs.readFileSync(filePath);
    const fileSize = stat.size;
    try {
      if (!isValidRange(range, fileSize)) throw new Error("Invaild range");
      const [start, end] = parseRange(range, fileSize);
      const chunkSize = end - start + 1;
      const responseHeader = {
        ...headers,
        "Content-Type": "text/html; charset=UTF-8",
        "Content-Length": chunkSize,
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        Date: Date.now(),
      };

      file = file.subarray(start, end + 1);

      const headerString = serializeHeaders(PARTIAL_CONTENT_STATUS_CODE, responseHeader);
      httpResponse(socket, headerString, file);
    } catch (error) {
      // 잘못된 범위 요청에 대한 처리
      console.error(`Error in handleRangeRequest: ${error.message}`);
      handleRangeNotSatisfiableError(socket);
    }
  }
}

function isValidRange(range, fileSize) {
  const match = range.match(/bytes=(\d*)-(\d*)/);
  if (!match) return false;

  const [start, end] = match.slice(1, 3).map(Number);
  return start < fileSize && (end ? end < fileSize && end >= start : true);
}

function parseRange(range, fileSize) {
  const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
  const start = parseInt(startStr, 10);
  const end = endStr ? Math.min(parseInt(endStr, 10), fileSize - 1) : fileSize - 1;
  return [start, end];
}

module.exports = { handleRangeRequest };
