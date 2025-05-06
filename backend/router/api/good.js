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
  prefix: "/api/good",
});

router.get(
  "/",
  API.permission.login,
  API.validate.goods.readList,
  async (ctx) => {
    ctx.body = await C.good.read(ctx._request_payload);
  }
);

module.exports = router;
