const zlib = require("zlib");
/**
 *
 * @param {net.socket} socket
 * @param {object} request
 * @param {object} response "{statusCode: "200 OK", headers: responseHeader, body: file, fileSize: fileSize}"
 */
function httpResponse(socket, response) {
  try {
    socket.write(response);
  } catch (error) {
    console.error(`Error sending response: ${error.message}`);
  }
}

module.exports = { httpResponse };
