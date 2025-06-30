const { validate, MyErr, parse, ERR_RES } = require("../../../utils");

async function readPage(ctx, next) {
  const payload = parse.toObj(ctx.request.query);
  const result = await validate.goods_readPage(payload);
  if (!result.valid) {
    ENV.isDev && console.log("read good list validate error", result);
    throw new MyErr({
      ...ERR_RES.GOOD.FIND.ERR_ARGS_FORMAT,
      error: result,
    });
  }
  ctx._request_payload = payload;
  await next();
}

module.exports = {
  readPage,
};
