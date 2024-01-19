const { fooIndex } = require("./index");
const { fooTest } = require("./test");
const { fooTravel } = require("./travel");
const { redirectRequest } = require("../common/redirect");
const { fooIndexJs } = require("./index-js");
const { fooIndexCss } = require("./index-css");
const serviceMap = new Map([
  ["/index.html", fooIndex],
  ["/test.html", fooTest],
  ["/travel.html", fooTravel],
  ["/redirect", redirectRequest],
  ["/index-js.js", fooIndexJs],
  ["/index-css.css", fooIndexCss],
]);

module.exports = { serviceMap };
