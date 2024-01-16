const { fooIndex } = require("./index");
const { fooTest } = require("./test");
const { redirectRequest } = require("../common/redirect");

const serviceMap = new Map([
  ["/index.html", fooIndex],
  ["/test.html", fooTest],
  ["/redirect", redirectRequest],
]);

module.exports = { serviceMap };
