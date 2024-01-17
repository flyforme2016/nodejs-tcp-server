const { barIndex } = require("./index");
const { barTest } = require("./test");
const { redirectRequest } = require("../common/redirect");

const serviceMap = new Map([
  ["/index.html", barIndex],
  ["/test.html", barTest],
  ["/redirect", redirectRequest],
]);

module.exports = { serviceMap };
