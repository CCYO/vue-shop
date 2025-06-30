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
  prefix: "/api/shopping",
});

router.post(
  "/",
  API.permission.login,
  API.validate.shopping.add,
  async (ctx) => {
    ctx.body = await C.shopping.add(ctx._request_payload);
  }
);

router.delete(
  "/",
  API.permission.login,
  API.validate.shopping.remove,
  async (ctx) => {
    ctx.body = await C.shopping.remove(ctx._request_payload);
  }
);

router.patch(
  "/order",
  API.permission.login,
  API.validate.shopping.order,
  async (ctx) => {
    ctx.body = await C.shopping.order(ctx._request_payload);
  }
);

router.patch(
  "/",
  API.permission.login,
  API.validate.shopping.modify,
  async (ctx) => {
    ctx.body = await C.shopping.modify(ctx._request_payload);
  }
);

router.get(
  "/listInCar",
  API.permission.login,
  API.validate.shopping.readPage,
  async (ctx) => {
    ctx.body = await C.shopping.readListInCar(ctx._request_payload);
  }
);

router.get(
  "/",
  API.permission.login,
  API.validate.shopping.read,
  async (ctx) => {
    ctx.body = await C.shopping.readOne(ctx._request_payload);
  }
);

module.exports = router;
