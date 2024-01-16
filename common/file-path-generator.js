require("dotenv").config();

function getFilePath(request) {
  const host = request.headers["Host"];
  const path = request.path;
  const filePathKey = host + path.replace("/", "-");
  return process.env[filePathKey];
}

module.exports = { getFilePath };
