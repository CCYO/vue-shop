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
  prefix: "/api/myStore",
});

router.post(
  "/",
  API.permission.login,
  API.validate.myStore.addGood,
  async (ctx) => {
    ctx.body = await C.myStore.addGood(ctx._request_payload);
  }
);

router.delete(
  "/",
  API.permission.login,
  API.validate.myStore.removeGood,
  async (ctx) => {
    ctx.body = await C.myStore.removeGood(ctx._request_payload);
  }
);

router.patch(
  "/",
  API.permission.login,
  API.validate.myStore.modifyGood,
  async (ctx) => {
    ctx.body = await C.myStore.modifyGood(ctx._request_payload);
  }
);

router.get(
  "/",
  API.permission.login,
  API.validate.myStore.getPage,
  async (ctx) => {
    ctx.body = await C.myStore.readPage(ctx._request_payload);
  }
);

module.exports = router;
