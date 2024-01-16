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
    socket.write(Buffer.from(headerString));
    socket.write(body);
  } catch (error) {
    console.error(`Error sending response: ${error.message}`);
  } finally {
    socket.end();
  }
}

module.exports = { httpResponse };
