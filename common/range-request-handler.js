const { httpResponse } = require("./http-response");
const { serializeHeaders } = require("./serialize-header");

function handleRangeRequest(socket, request, response) {
  let body = response.body;
  const range = request.headers["Range"];
  if (range) {
    try {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : response.fileSize - 1;
      const chunkSize = end - start + 1;

      response.header["Content-Range"] = `bytes ${start}-${end}/${response.fileSize}`;
      response.header["Content-Length"] = chunkSize;
      response.statusCode = 206;

      body = body.subarray(start, end + 1);
    } catch (error) {
      console.error(`Error in handleRangeRequest ${error.message}`);
    }
  }
  const headerString = serializeHeaders(response.statusCode, response.header);

  httpResponse(socket, headerString, body);
}

module.exports = { handleRangeRequest };
