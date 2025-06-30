const { validate, MyErr, ERR_RES, parse } = require("../../../utils");
const { ENV } = require("../../../config");
const C = require("../../../controller");

async function register(ctx, next) {
  const payload = { ...ctx.request.body };
  const result = await validate.user_register(payload);
  if (!result.valid) {
    ENV.isDev && console.log("register validate error", result);
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

async function setting(ctx, next) {
  const payload = parse.toObj(ctx.request.query);
  const { id, ..._old } = ctx.session.user;
  if (payload.current_password) {
    payload.current_password = payload.current_password.toString();
    const { errno, msg } = await C.seller.checkPassword({
      id,
      password: payload.current_password,
    });
    if (errno) {
      throw new MyErr({ errno, msg });
    } else {
      payload.password = payload.new_password.toString();
      delete payload.new_password;
      delete payload.current_password;
    }
  }
  payload.id = id;
  const result = await validate.user_setting({ ...payload, _old });
  if (!result.valid) {
    ENV.isDev && console.log("setting user info validate error", result);
    throw new MyErr({
      ...ERR_RES.SELLER.UPDATE.ERR_SETTING_FORMAT,
      error: result,
    });
  }
  ctx._request_payload = { ...payload };
  await next();
}

async function password(ctx, next) {
  const payload = { ...ctx.request.body };
  payload.id = ctx.session.user.id;
  const result = await validate.user_password(payload);
  if (!result.valid) {
    ENV.isDev && console.log("check current password validate error", result);
    throw new MyErr({
      ...ERR_RES.SELLER.FIND.ERR_PASSWORD_FORMAT,
      error: result,
    });
  }
  ctx._request_payload = { ...payload };
  await next();
}

async function login(ctx, next) {
  const payload = { ...ctx.request.body };
  const result = await validate.user_login(payload);
  if (!result.valid) {
    ENV.isDev && console.log("login validate error", result);
    throw new MyErr({
      ...ERR_RES.SELLER.FIND.ERR_LOGIN_FORMAT,
      error: result,
    });
  }
  ctx._request_payload = { ...payload };
  await next();
}

module.exports = {
  register,
  setting,
  login,
  password,
};
