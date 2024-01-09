const { serializeResponse } = require("./serialize-header");
const { httpResponse } = require("../common/http-response");
const { serviceMap } = require("./service-map");
const { headers } = require("../common/response-header");
const { handleRangeError } = require("../common/range-error-handler");
const fs = require("fs");

/**
 * Range 헤더를 분석하여 206 응답을 처리하는 핸들러
 * @param {net.socket} socket
 * @param {object} request { method: 'POST', path: '/test.html', version: 'HTTP/1.1', header: [ 'Host: www.bar.com', ...], body: [ '' ] }
 */
function getPartialContent(socket, request) {
  const statusCode = "206 Partial Content";
  let responseHeader = headers;

  const filePath = `C:/Users/cjdfi/Desktop/ws2/foo/static${request.path}`;
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  const parts = range.replace(/bytes=/, "").split("-");
  const startByte = parseInt(parts[0], 10);
  const endByte = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  const chunkSize = endByte - startByte + 1;
  try {
    const fileStream = fs.createReadStream(filePath, { start: startByte, end: endByte });
    responseHeader["Content-Length"] = chunkSize;
    responseHeader["Content-Type"] = "text/html; charset=UTF-8";
    responseHeader["Content-Range"] = `bytes ${startByte}-${endByte}/${fileSize}`;
    httpResponse(socket, serializeResponse(statusCode, responseHeader), fileStream);
  } catch (error) {
    handleRangeError(socket);
  }
}

module.exports = { getPartialContent };
