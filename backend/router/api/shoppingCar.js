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
  prefix: "/api/shoppingCart",
});

router.get(
  "/",
  API.permission.login,
  API.validate.shoppingCar.readGood,
  async (ctx) => {
    ctx.body = await C.shoppingCar.read(ctx._request_payload);
  }
);

module.exports = router;
