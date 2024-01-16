/**
 * 요청 URL을 분석하여 경로와 호스트를 반환하는 함수
 * @param {Buffer} data
 * @returns {object} { method : GET, path : "/indext.html", version:"HTTP/1.1", header : "www.foo.com ..." }
 */
function requestParser(data) {
  const requestLines = data.toString().split("\r\n");
  const emptyLineIndex = requestLines.indexOf(""); // 헤더와 바디를 구분하기 위한 기준 Index
  const [method, path, version] = request[0].split(" ");
  const headers = parseHeaders(requestLines.slice(1, emptyLineIndex));
  const body = requestLines.slice(emptyLineIndex + 1);

  return { method, path, version, headers, body };
}

function parseHeaders(lines) {
  let headers = {};
  lines.forEach((line) => {
    const [key, value] = line.split(":");
    if (key && value) {
      headers[key.trim()] = value.trim();
    }
  });
  return headers;
}

module.exports = { requestParser };
