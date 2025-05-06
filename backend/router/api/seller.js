/**
 * @description
 */
/* NPM        ----------------------------------------------------------------------------- */
let Router = require("koa-router");

/* CONTROLLER ----------------------------------------------------------------------------- */
const C = require("../../controller");

/* MIDDLEWARE ----------------------------------------------------------------------------- */
const { API } = require("../../middleware");

const router = new Router({
  prefix: "/api/user",
});

router.get("/", API.permission.status);

router.post(
  "/login",
  API.session.login,
  API.validate.seller.login,
  async (ctx) => {
    ctx.body = await C.seller.login(ctx._request_payload);
  }
);

router.post("/register", API.validate.seller.register, async (ctx) => {
  ctx.body = await C.seller.register(ctx._request_payloads);
});

router.get("/logout", API.permission.login, API.session.logout);

module.exports = router;
