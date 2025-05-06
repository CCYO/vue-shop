const { SuccModel } = require("../../utils");

async function login(ctx, next) {
  await next();
  const { errno, data } = ctx.body;
  if (errno) {
    return;
  }
  ctx.session.user = data;
}

async function logout(ctx, next) {
  delete ctx.session.user;
  ctx.body = new SuccModel();
}

module.exports = {
  login,
  logout,
};
