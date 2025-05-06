const { validate, MyErr, parse } = require("../../../utils");
const { ERR_RES } = require("../../../config");

async function readList(ctx, next) {
  const payload = parse.toObj(ctx.request.query);
  const result = await validate.readGoodList(payload);
  if (!result.valid) {
    throw new MyErr({
      ...ERR_RES.GOOD.READ.ERR_ARGS_FORMAT,
      error: result,
    });
  }
  ctx._request_payload = payload;
  await next();
}

module.exports = {
  readList,
};
