const { fooIndex } = require("./index");
const { fooTest } = require("./test");
const { redirectRequest } = require("../common/redirect");
let serviceMap = new Map();

serviceMap.set("/index.html", fooIndex);
serviceMap.set("/test.html", fooTest);
serviceMap.set("/redirect", redirectRequest);

module.exports = { serviceMap };
