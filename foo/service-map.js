const { fooIndex } = require("./index");
const { fooTest } = require("./test");
const { fooTravel } = require("./travel");
const { redirectRequest } = require("../common/redirect");
const { fooIndexJs } = require("./index-js");
const { fooIndexCss } = require("./index-css");
const { fooImage } = require("./image");
const serviceMap = new Map([
  ["/index.html", fooIndex],
  ["/test.html", fooTest],
  ["/travel.html", fooTravel],
  ["/redirect", redirectRequest],
  ["/index-js.js", fooIndexJs],
  ["/index-css.css", fooIndexCss],
  ["/origin.jpg", fooImage],
]);

module.exports = { serviceMap };
