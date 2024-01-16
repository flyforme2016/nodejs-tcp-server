const { httpResponse } = require("./http-response");
const { handleRangeNotSatisfiableError } = require("./range-not-satisfiable-error-handler");
const { serializeHeaders } = require("./serialize-header");

function handleRangeRequest(socket, request, response) {
  let body = response.body;
  const range = request.headers["Range"];

  if (range) {
    try {
      if (!isValidRange(range, response.fileSize)) {
        throw new Error("Invalid range");
      }

      const [start, end] = parseRange(range, response.fileSize);
      const chunkSize = end - start + 1;

      response.header["Content-Range"] = `bytes ${start}-${end}/${response.fileSize}`;
      response.header["Content-Length"] = chunkSize;
      response.statusCode = 206;

      body = body.subarray(start, end + 1);
    } catch (error) {
      console.error(`Error in handleRangeRequest: ${error.message}`);
      // 잘못된 범위 요청에 대한 처리
      handleRangeNotSatisfiableError(socket);
    }
  }

  const headerString = serializeHeaders(response.statusCode, response.header);
  httpResponse(socket, headerString, body);
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
