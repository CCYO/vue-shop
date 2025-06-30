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

router.post("/register", API.validate.user.register, async (ctx) => {
  ctx.body = await C.user.register(ctx._request_payload);
});

router.patch(
  "/",
  API.permission.login,
  API.session.update,
  API.validate.user.setting,
  API.firebase.userAvatar,
  async (ctx) => {
    ctx.body = await C.user.setting(ctx._request_payload);
  }
);

router.post(
  "/login",
  API.session.login,
  API.validate.user.login,
  async (ctx) => {
    ctx.body = await C.user.login(ctx._request_payload);
  }
);

router.post("/checkPassword", API.validate.user.password, async (ctx) => {
  ctx.body = await C.user.checkPassword(ctx._request_payload);
});

router.get("/logout", API.permission.login, API.session.logout);

module.exports = router;
