const { ErrModel, SuccModel, ERR_RES } = require("../../utils");

async function login(ctx, next) {
  if (ctx.session.user) {
    await next();
  } else {
    ctx.status = 401;
    ctx.body = new ErrModel(ERR_RES.PERMISSION.FIND.NEED_LOGIN);
  }
  return;
}

async function status(ctx) {
  if (ctx.session.user) {
    ctx.body = new SuccModel({ data: ctx.session.user });
  } else {
    ctx.body = new ErrModel(ERR_RES.PERMISSION.FIND.NOT_LOGIN);
  }
  return;
}

module.exports = { status, login };
