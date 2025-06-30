const { validate, ErrModel, parse, ERR_RES, MyErr } = require("../../../utils");
const { ENV } = require("../../../config");
const C = require("../../../controller");

async function add(ctx, next) {
  const payload = { ...ctx.request.body };
  const result = await validate.myStore_add(ctx.request.body);
  if (!result.valid) {
    ENV.isDev && console.log("addMyGood validate error", result);
    ctx.body = new ErrModel(ERR_RES.MY_STORE.CREATE.ERR_ARGS_FORMAT);
    return;
  }
  ctx._request_payload = {
    ...payload,
    seller_id: ctx.session.user.id,
  };
  await next();
}

async function remove(ctx, next) {
  const payload = { ...ctx.request.body };
  const result = await validate.myStore_remove(payload);
  if (!result.valid) {
    ENV.isDev && console.log("removeMyGood validate error", result);
    ctx.body = new ErrModel(ERR_RES.MY_STORE.DESTORY.ERR_ARGS_FORMAT);
    return;
  }
  ctx._request_payload = {
    ...payload,
    seller_id: ctx.session.user.id,
  };
  await next();
}

async function modify(ctx, next) {
  const payload = { ...ctx.request.body, seller_id: ctx.session.user.id };
  // 查詢現有數據
  const { errno, data, msg } = await C.myStore.readGood(payload);
  if (errno) {
    throw new MyErr({ errno, msg });
  }
  const result = await validate.myStore_modify({ ...payload, _old: data.item });
  if (!result.valid) {
    ENV.isDev && console.log("modifyMyGood validate error", result);
    ctx.body = new ErrModel(ERR_RES.MY_STORE.UPDATE.ERR_ARGS_FORMAT);
    return;
  }
  ctx._request_payload = payload;
  await next();
}

async function readPage(ctx, next) {
  const payload = parse.toObj(ctx.request.query);
  const result = await validate.myStore_readPage(payload);
  if (!result.valid) {
    ENV.isDev && console.log("getMyGoodPage validate error", result);
    ctx.body = new ErrModel(ERR_RES.MY_STORE.FIND.ERR_ARGS_FORMAT);
    return;
  }
  // 疑問？
  // ctx.request.query kvpairs的value始終會被轉為string，這是為何?
  ctx._request_payload = {
    ...payload,
    seller_id: ctx.session.user.id,
  };
  await next();
}

module.exports = {
  add,
  remove,
  modify,
  readPage,
};
