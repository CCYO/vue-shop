const { validate, ErrModel, parse, ERR_RES } = require("../../../utils");
const { ENV } = require("../../../config");

async function add(ctx, next) {
  const payload = { ...ctx.request.body };
  payload.buyer_id = ctx.session.user.id;
  const result = await validate.shopping_add(payload);
  if (!result.valid) {
    ENV.isDev && console.log("addGoodToShoppingCar validate error", result);
    ctx.body = new ErrModel(ERR_RES.SHOPPING_CAR.CREATE.ERR_ARGS_FORMAT);
    return;
  }
  ctx._request_payload = payload;
  await next();
}

async function remove(ctx, next) {
  const payload = { ...ctx.request.body };
  const result = await validate.shopping_remove(payload);
  if (!result.valid) {
    ENV.isDev && console.log("remove ShoppingCar validate error", result);
    ctx.body = new ErrModel(ERR_RES.SHOPPING_CAR.DESTORY.ERR_ARGS_FORMAT);
    return;
  }
  ctx._request_payload = payload;
  await next();
}
async function modify(ctx, next) {
  const payload = { ...ctx.request.body };
  payload.buyer_id = ctx.session.user.id;
  const result = await validate.shopping_modify(payload);
  if (!result.valid) {
    ENV.isDev && console.log("modifyGoodInShoppingCar validate error", result);
    ctx.body = new ErrModel(
      ERR_RES.SHOPPING_CAR.UPDATE.ERR_ARGS_FORMAT_FOR_MODIFY
    );
    return;
  }
  ctx._request_payload = payload;
  await next();
}

async function order(ctx, next) {
  const payload = { ...ctx.request.body };
  const result = await validate.shopping_order(payload);
  if (!result.valid) {
    ENV.isDev && console.log("order validate error", result);
    ctx.body = new ErrModel(
      ERR_RES.SHOPPING_CAR.UPDATE.ERR_ARGS_FORMAT_FOR_ORDER
    );
    return;
  }
  ctx._request_payload = payload;
  await next();
}

async function read(ctx, next) {
  const payload = parse.toObj(ctx.request.query);
  payload.buyer_id = ctx.session.user.id;
  const result = await validate.shopping_read(payload);
  if (!result.valid) {
    ENV.isDev && console.log("readGoodInCar validate error", result);
    ctx.body = new ErrModel(ERR_RES.SHOPPING_CAR.FIND.ERR_ARGS_FORMAT);
    return;
  }
  ctx._request_payload = payload;
  await next();
}

async function readPage(ctx, next) {
  const payload = parse.toObj(ctx.request.query);
  payload.buyer_id = ctx.session.user.id;
  const result = await validate.shopping_readPage(payload);
  if (!result.valid) {
    ENV.isDev && console.log("readListInCar validate error", result);
    ctx.body = new ErrModel(ERR_RES.SHOPPING_CAR.FIND.ERR_ARGS_FORMAT);
    return;
  }
  ctx._request_payload = payload;
  await next();
}

module.exports = {
  add,
  remove,
  modify,
  order,
  read,
  readPage,
};
