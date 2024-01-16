const { httpResponse } = require("./http-response");
const { handleRangeRequest } = require("./range-request-handler");
const { serializeHeaders } = require("./serialize-header");

function handleConditionalRequest(socket, request, response) {
  let buffer = response.body;
  const ifModifiedSince = request.headers["If-Modified-Since"];
  const lastMTime = response.lastMTime;

  if (ifModifiedSince && ifModifiedSince >= lastMTime) {
    response.header["Date"] = Date.now();
    response.header["Last-Modified"] = lastMTime;
    response.header["Content-Length"] = 0;
    response.statusCode = 304;
    buffer = Buffer.alloc(0);
    const headerString = serializeHeaders(response.statusCode, response.header);
    httpResponse(socket, headerString, buffer);
  } else {
    // Chain of responsibility
    handleRangeRequest(socket, request, response);
  }
}

module.exports = { handleConditionalRequest };
