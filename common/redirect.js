const { headers } = require("./response-header");
/**
 * 응답 http body 및 header를 반환하는 함수
 */
function redirectRequest(socket, request, redirectPath) {
  let body = "<html><body><h1>Wait Redirection</h1></body></html>";
  const fileSize = body.length;
  let statusCode = 302;
  let header = headers;
  header["Content-Length"] = Buffer.byteLength(body);
  header["Content-Type"] = "text/html; charset=UTF-8";
  header["Location"] = redirectPath;

  return { statusCode, header, body, fileSize };
}

module.exports = { redirectRequest };
