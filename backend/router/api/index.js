/**
 * @description 彙整api routes
 */
const Router = require("koa-router");

const user = require("./user");
const goods = require("./goods");
const myStore = require("./myStore");
const shopping = require("./shopping");

const router = new Router();

router.use(user.routes());
router.use(goods.routes());
router.use(myStore.routes());
router.use(shopping.routes());

module.exports = router;
