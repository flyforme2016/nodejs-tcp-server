const { fooIndex } = require("./index");
const { fooTest } = require("./test");
const { fooTravel } = require("./travel");
const { redirectRequest } = require("../common/redirect");
const { fooIndexJs } = require("./index-js");
const { fooIndexCss } = require("./index-css");
const { fooImage } = require("./image");
const { pageFx } = require("./pagefx");
const { pageDeskReplacePre } = require("./page/pagedesk/page-desk-replace-pre");
const { pageDeskReplacePost } = require("./page/pagedesk/page-desk-replace-post");
const { pageDeskHtmlIn } = require("./page/pagedesk/page-desk-html-in");
const { pageDeskDomInsert } = require("./page/pagedesk/page-desk-dom-insert");
const { pageDeskDomRemove } = require("./page/pagedesk/page-desk-dom-remove");
const { pageDeskDomTags } = require("./page/pagedesk/page-desk-dom-tags");
const { pageDeskDomRefctrl } = require("./page/pagedesk/page-desk-dom-refctrl");
const { pageFxFrontendResponsive } = require("./page/pagefx/page-fx-frontend-responsive");
const {
  pageFxFrontendIframeautoheight,
} = require("./page/pagefx/page-fx-frontend-iframeautoheight");
const { pageMixedTrafficsRebound } = require("./page/pagemixed/page-mixed-traffics-rebound");
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
  ["/page-desk-replace-pre.html", pageDeskReplacePre],
  ["/page-desk-replace-post.html", pageDeskReplacePost],
  ["/page-desk-html-in.json", pageDeskHtmlIn],
  ["/page-desk-dom-insert.html", pageDeskDomInsert],
  ["/page-desk-dom-remove.html", pageDeskDomRemove],
  ["/page-desk-dom-tags.html", pageDeskDomTags],
  ["/page-desk-dom-refctrl.html", pageDeskDomRefctrl],
  ["/page-fx-frontend-responsive.html", pageFxFrontendResponsive],
  ["/page-fx-frontend-iframeautoheight.html", pageFxFrontendIframeautoheight],
  ["/page-mixed-traffics-rebound.html", pageMixedTrafficsRebound],
]);

module.exports = { serviceMap };
