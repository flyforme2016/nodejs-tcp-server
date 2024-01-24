const { fooIndex } = require("./index");
const { fooTest } = require("./test");
const { fooTravel } = require("./travel");
const { redirectRequest } = require("../common/redirect");
const { fooIndexJs } = require("./index-js");
const { fooIndexCss } = require("./index-css");
const { fooImage } = require("./image");
const { pageFx } = require("./pagefx");
const { pageDeskPre } = require("./page/pagedesk/pagedesk-pre");
const { pageDeskHtmlIn } = require("./page/pagedesk/page-desk-html-in");
const { pageDeskDomInsert } = require("./page/pagedesk/page-desk-dom-insert");
const { pageDeskDomRemove } = require("./page/pagedesk/page-desk-dom-remove");
const { pageDeskDomTags } = require("./page/pagedesk/page-desk-dom-tags");
const { pageDeskDomRefctrl } = require("./page/pagedesk/page-desk-dom-refctrl");
const serviceMap = new Map([
  ["/index.html", fooIndex],
  ["/test.html", fooTest],
  ["/travel.html", fooTravel],
  ["/redirect", redirectRequest],
  ["/index-js.js", fooIndexJs],
  ["/index-css.css", fooIndexCss],
  ["/origin.jpg", fooImage],
  ["/origin2.jpg", fooImage],
  ["/origin3.jpg", fooImage],
  ["/origin4.jpg", fooImage],
  ["/page-fx.html", pageFx],
  ["/page-desk-pre.html", pageDeskPre],
  ["/page-desk-html-in.json", pageDeskHtmlIn],
  ["/page-desk-dom-insert.html", pageDeskDomInsert],
  ["/page-desk-dom-remove.html", pageDeskDomRemove],
  ["/page-desk-dom-tags.html", pageDeskDomTags],
  ["/page-desk-dom-refctrl.html", pageDeskDomRefctrl],
]);

module.exports = { serviceMap };
