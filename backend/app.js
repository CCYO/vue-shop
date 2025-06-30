/* CONFIG     ----------------------------------------------------------------------------- */
const { ENV } = require("./config");
const { SESSION } = require("./_config");

/* NPM        ----------------------------------------------------------------------------- */
// 支援sourcemap
require("source-map-support").install();
//  處理非 multipart/form-data 的請求數據
const bodyparser = require("koa-bodyparser")({
  enableTypes: ["json", "form", "text"],
});

const Koa = require("koa");

/* UTILS      ----------------------------------------------------------------------------- */

//  錯誤處理
const { errorHandle } = require("./utils");
const { transaction, session } = require("./middleware");
const router = require("./router");

/* RUNTIME    ----------------------------------------------------------------------------- */

const app = new Koa();
//  加密 session
app.keys = [SESSION.KEY];

app.use(errorHandle.middleware);

if (!ENV.isProd) {
  //  打印每一次的request與response
  app.use(require("koa-logger")());
  //  針對JSON類型的response，提高可讀性
  app.use(require("koa-json")());
}

app.use(bodyparser);
app.use(session);
app.use(transaction);
app.use(router.routes(), router.allowedMethods());

app.on("error", errorHandle.log);

module.exports = app;
