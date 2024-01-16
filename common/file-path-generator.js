require("dotenv").config();

function getFilePath(request) {
  const host = request.headers["Host"];
  const path = request.path;
  const filePathKey = host + path.replace("/", "-");
  console.log("🚀 ~ file: file-path-generator.js:7 ~ getFilePath ~ filePathKey:", filePathKey);
  return process.env[filePathKey];
}

module.exports = { getFilePath };
