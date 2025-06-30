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
  prefix: "/api/goods",
});

router.get(
  "/",
  API.permission.login,
  API.validate.goods.readPage,
  async (ctx) => {
    ctx.body = await C.goods.readPageOfType(ctx._request_payload);
  }
);

module.exports = router;
