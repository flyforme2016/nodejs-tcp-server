const zlib = require("zlib");
function compressHttp(header, body) {
  return new Promise((resolve, reject) => {
    zlib.deflate(body, (err, compressedBodyBuffer) => {
      if (err) reject(err);
      header["Content-Encoding"] = "deflate";
      header["Content-Length"] = compressedBodyBuffer.byteLength;
      resolve({ header, compressedBodyBuffer });
    });
  });

  //   return new Promise((resolve, reject) => {
  //     zlib.gzip(body, (err, compressedBodyBuffer) => {
  //       if (err) reject(err);
  //       header["Content-Encoding"] = "gzip";
  //       header["Content-Length"] = compressedBodyBuffer.byteLength;
  //       resolve({ header, compressedBodyBuffer });
  //     });
  //   });
}

module.exports = { compressHttp };
