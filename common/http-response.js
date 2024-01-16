const { serializeHeaders } = require("./serialize-header");
/**
 *
 * @param {net.socket} socket
 * @param {object} request
 * @param {object} response "{statusCode: "200 OK", headers: responseHeader, body: file, fileSize: fileSize}"
 */
function httpResponse(socket, request, response) {
  let buffer = response.body;
  const range = request.headers["Range"];
  const ifModifiedSince = request.headers["If-Modified-Since"];
  const lastMTime = response.lastMTime;

  console.log("🚀 ~ httpResponse ~ ifModifiedSince, lastMTime:", ifModifiedSince, lastMTime);
  if (ifModifiedSince >= lastMTime) {
    console.log("check");
    buffer = new Buffer.alloc(0);
    response.header["Date"] = Date.now();
    response.header["Last-Modified"] = lastMTime;
    response.header["Content-Length"] = 0;
    response["statusCode"] = 304;
  }
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start;
    response.header["Content-Range"] = `bytes ${start}-${end}/${response.fileSize}`;
    response.header["Content-Length"] = chunkSize;
    response["statusCode"] = 206;

    buffer = buffer.subarray(start, end);
  }
  const headerString = serializeHeaders(response.statusCode, response.header);
  socket.write(Buffer.from(headerString));
  socket.write(buffer);
  console.log("🚀 ~ httpResponse ~ buffer:", buffer);
  console.log("🚀 ~ httpResponse ~ buffer.toString():", buffer.toString());
  socket.end();
}

module.exports = { httpResponse };
