/* CONFIG     ----------------------------------------------------------------------------- */
const { ENV } = require("./config");
const { SESSION } = require("./_config");

/* NPM        ----------------------------------------------------------------------------- */
const Koa = require("koa");
//  處理非 multipart/form-data 的請求數據
const bodyparser = require("koa-bodyparser")({
  enableTypes: ["json", "form", "text"],
});

/* UTILS      ----------------------------------------------------------------------------- */
//  錯誤處理
const { transaction, session } = require("./middleware");
const router = require("./router");
const { errorHandle } = require("./utils");
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
