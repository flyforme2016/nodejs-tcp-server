const statusCodeMap = new Map();
statusCodeMap.set(200, "200 OK");
statusCodeMap.set(302, "302 Found");
statusCodeMap.set(206, "206 Partial Content");
statusCodeMap.set(404, "404 Not Found");
function serializeHeaders(statusCode, header) {
  let headerString = `HTTP/1.1 ${statusCodeMap.get(statusCode)}\r\n`;

  for (const [key, value] of Object.entries(header)) {
    headerString += `${key}: ${value}\r\n`;
  }
  console.log(
    "🚀 ~ file: serialize-response.js:7 ~ serializeResponse ~ headerString:\n" + headerString
  );

  return headerString + `\r\n`;
}
module.exports = { serializeHeaders };