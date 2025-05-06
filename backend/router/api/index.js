/**
 * @description 彙整api routes
 */
const Router = require("koa-router");

const seller = require("./seller");
const good = require("./good");
const myStore = require("./myStore");
const shoppingCar = require("./shoppingCar");

const router = new Router();

router.use(seller.routes());
router.use(good.routes());
router.use(myStore.routes());
router.use(shoppingCar.routes());

module.exports = router;
