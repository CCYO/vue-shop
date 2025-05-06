const { ErrModel, SuccModel } = require("../../utils");
const { ERR_RES } = require("../../config");

async function login(ctx, next) {
  if (ctx.session.user) {
    await next();
  } else {
    ctx.status = 401;
    ctx.body = new ErrModel(ERR_RES.PERMISSION.READ.NEED_LOGIN);
  }
  return;
}

async function status(ctx) {
  if (ctx.session.user) {
    ctx.body = new SuccModel({ data: ctx.session.user });
  } else {
    ctx.body = new ErrModel(ERR_RES.PERMISSION.READ.NOT_LOGIN);
  }
  return;
}

module.exports = { status, login };
