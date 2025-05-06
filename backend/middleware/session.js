/* CONFIG     ----------------------------------------------------------------------------- */
const { REDIS } = require("../config");

/* NPM        ----------------------------------------------------------------------------- */
const session = require("koa-generic-session");

/* CUSTOM     ----------------------------------------------------------------------------- */
const { Redis } = require("../db");

module.exports = session({
  //  存放在瀏覽器的cookie裡，session 的 key
  key: REDIS.COOKIE_KEY,
  //  存放在 redis 裡,為 session key 所加的前綴
  prefix: REDIS.REDIS_PREFIX,
  store: Redis.store,
});
