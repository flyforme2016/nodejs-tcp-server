const { handleUndefinedHost } = require("../common/error");
const { barIndex } = require("./index");
const { barTest } = require("./test");
const { redirectRequest } = require("../common/redirect");

let serviceMap = new Map();

serviceMap.set("error", handleUndefinedHost);
serviceMap.set("/index.html", barIndex);
serviceMap.set("/test.html", barTest);
serviceMap.set("/redirect", redirectRequest);

module.exports = { serviceMap };
