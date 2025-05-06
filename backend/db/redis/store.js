/* CONFIG     ----------------------------------------------------------------------------- */
const { REDIS } = require("../../_config");

/* NPM        ----------------------------------------------------------------------------- */
const redisStore = require("koa-redis");

/* UTILS      ----------------------------------------------------------------------------- */
const { log } = require("../../utils");

const store = redisStore(REDIS);

store.client
  .on("connect", () => log("Redis connect"))
  .on("error", (e) => console.error("Redis connect Error:\n", e));

module.exports = store;
