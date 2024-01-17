/**
 *
 * @param {net.socket} socket
 * @param {object} request
 * @param {object} response "{statusCode: "200 OK", headers: responseHeader, body: file, fileSize: fileSize}"
 */
function httpResponse(socket, headerString, body) {
  console.log("🚀 ~ httpResponse ~ headerString:\n", headerString);
  console.log("🚀 ~ httpResponse ~ body:\n", body.toString());
  try {
    const headerBuffer = Buffer.from(headerString);
    const response = Buffer.concat([headerBuffer, body]);
    socket.write(response);
  } catch (error) {
    console.error(`Error sending response: ${error.message}`);
  }
}

module.exports = { httpResponse };
