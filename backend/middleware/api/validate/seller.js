const { validate, MyErr } = require("../../../utils");
const { ERR_RES } = require("../../../config");

async function login(ctx, next) {
  const payload = { ...ctx.request.body };
  const result = await validate.login(payload);
  if (!result.valid) {
    throw new MyErr({
      ...ERR_RES.SELLER.READ.ERR_LOGIN_FORMAT,
      error: result,
    });
  }
  ctx._request_payload = { ...payload };
  await next();
}

async function register(ctx, next) {
  const payload = { ...ctx.request.body };
  const result = await validate.register(payload);
  if (!result.valid) {
    throw new MyErr({
      ...ERR_RES.SELLER.CREATE.ERR_REGISTER_FORMAT,
      error: result,
    });
  }
  // 移除多餘的參數
  ctx._request_payload = { ...payload };
  delete ctx._request_payload.checkPassword;
  await next();
}

module.exports = {
  login,
  register,
};
