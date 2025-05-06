/**
 * @description 彙整routes
 */

/* NPM        ----------------------------------------------------------------------------- */
let Router = require("koa-router");

const api = require("./api");

const router = new Router();

router.use(api.routes());

module.exports = router;
