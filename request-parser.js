/**
 * 요청 URL을 분석하여 경로와 호스트를 반환하는 함수
 * @param {Buffer} data
 * @returns {object} { method : GET, path : "/indext.html", version:"HTTP/1.1", header : "www.foo.com ..." }
 */
function requestParser(data) {
  const request = data.toString().split("\r\n");
  const idx = request.indexOf("");
  const [method, path, version] = request[0].split(" ");
  const headers = request.slice(1, idx);
  let header = {};
  headers.forEach(function (data) {
    let [key, value] = data.split(":");
    header[key] = value.trim();
  });
  const body = request.slice(idx + 1);

  return { method, path, version, header, body };
}

module.exports = { requestParser };
