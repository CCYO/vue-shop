const { validate, ErrModel, parse } = require("../../../utils");
const { ERR_RES, ENV } = require("../../../config");

async function readGood(ctx, next) {
  const payload = parse.toObj(ctx.request.query);
  payload.seller_id = ctx.session.user.id;
  const result = await validate.readGoodInCar(payload);
  if (!result.valid) {
    ENV.isDev && console.log("readGoodInCar validate error", result);
    ctx.body = new ErrModel(ERR_RES.SHOPPING_CAR.READ.ERR_ARGS_FORMAT);
    return;
  }
  ctx._request_payload = payload;
  await next();
}

module.exports = {
  readGood,
};
