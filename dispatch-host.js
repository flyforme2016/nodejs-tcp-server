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
  try {
    const request = requestParser(buffer);
    const host = determineHost(request.header.Host);

    const handler = hostHandlerMap.get(host) || response404;
    handler(socket, request);
  } catch (error) {
    console.error(`Error in dispatchHost: ${error.message}`);
    response404(socket);
  }
}

function determineHost(host) {
  return host === "127.0.0.1" ? config.defaultHost : host;
}

module.exports = { dispatchHost };
