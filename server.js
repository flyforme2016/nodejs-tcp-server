const { createServer } = require("net");
const { dispatchHost } = require("./dispatch-host");
/**
 * 클라이언트 요청을 수신하는 TCP 서버 생성
 * @param {number} port
 */
function startServer(port) {
  const server = createServer(listenRequest);
  server.listen(port, () => onListen(port));
  server.on("error", (err) => {
    console.error(`Server error: ${err.message}`);
  });
}

function onListen(port) {
  console.log(`Server running on port ${port}`);
}

/**
 * 요청을 수신하고 host에 따른 handler를 결정하는 dispatcher 호출,
 * @param {net.socket} socket
 */
function listenRequest(socket) {
  socket.on("data", (buffer) => {
    try {
      dispatchHost(socket, buffer);
    } catch (err) {
      console.error(`Error in listenRequest: ${err.message}`);
    }
  });
}

module.exports = { startServer };
