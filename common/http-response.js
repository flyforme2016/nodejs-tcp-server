const { serializeHeaders } = require("./serialize-header");
/**
 *
 * @param {net.socket} socket
 * @param {object} request
 * @param {object} response "{statusCode: "200 OK", headers: responseHeader, body: file, fileSize: fileSize}"
 */
function httpResponse(socket, request, response) {
  let buffer = response.body;
  const range = request.header.Range;

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
  // socket.write(Buffer.from(buffer));
  socket.write(buffer);
  socket.end();
}

module.exports = { httpResponse };
