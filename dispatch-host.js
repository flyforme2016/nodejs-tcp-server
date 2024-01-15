const { requestParser } = require("./request-parser");
const { fooHandler } = require("./foo/handler");
const { barHandler } = require("./bar/handler");
const { response404 } = require("./common/error");
const config = require("./config.json");
const hostHandlerMap = new Map();

hostHandlerMap.set("www.foo.com", fooHandler);
hostHandlerMap.set("www.bar.com", barHandler);

/**
 * 각 요청에 맞는 컨트롤러를 결정하는 함수
 * @param {net.socket} socket
 * @param {Buffer} buffer
 */
function dispatchHost(socket, buffer) {
  let request = requestParser(buffer);
  console.log("🚀 ~ dispatchHost ~ request:", request);
  let host = request.header.Host;

  // 1) 요청 헤더에 host가 작성되어 있지 않은 경우 default host(www.foo.com)사용.
  if (host === "127.0.0.1") host = config.defaultHost;

  // 2) 알 수 없는 host로 요청 시 404 Not Found 처리
  let hostHandler = hostHandlerMap.get(host);
  if (hostHandler === undefined) response404(socket, request);
  // 3) 해당 host를 처리할 handler 호출
  else hostHandler(socket, request);
}

module.exports = { dispatchHost };
