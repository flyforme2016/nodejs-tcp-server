require("dotenv").config();

function getFilePath(request) {
  const host = request.headers["Host"];
  const path = request.path;
  const filePathKey = host + path.replace(/\//g, "-");
  console.log("filePathKey: ", filePathKey);
  return process.env[filePathKey.trim()];
}

module.exports = { getFilePath };
