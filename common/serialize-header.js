const statusCodeMap = new Map();
statusCodeMap.set(200, "200 OK");
statusCodeMap.set(206, "206 Partial Content");
statusCodeMap.set(302, "302 Found");
statusCodeMap.set(304, "304 Not Modified");
statusCodeMap.set(404, "404 Not Found");
function serializeHeaders(statusCode, header) {
  console.log("🚀 ~ serializeHeaders ~ statusCode:", statusCode);
  let headerString = `HTTP/1.1 ${statusCodeMap.get(statusCode)}\r\n`;

  for (const [key, value] of Object.entries(header)) {
    headerString += `${key}: ${value}\r\n`;
  }

  return headerString + `\r\n`;
}
module.exports = { serializeHeaders };
