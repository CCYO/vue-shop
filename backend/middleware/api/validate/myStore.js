const { validate, ErrModel, parse } = require("../../../utils");
const { ERR_RES, ENV } = require("../../../config");
const C = require("../../../controller");

async function addGood(ctx, next) {
  const payload = { ...ctx.request.body };
  const result = await validate.addMyGood(ctx.request.body);
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

async function removeGood(ctx, next) {
  const payload = { ...ctx.request.body };
  const result = await validate.removeMyGood(payload);
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

async function modifyGood(ctx, next) {
  const payload = { ...ctx.request.body, seller_id: ctx.session.user.id };
  // 查詢現有數據
  const { type, ..._old } = await C.myStore.readGood(payload);
  const result = await validate.modifyMyGood({ ...payload, _old });
  if (!result.valid) {
    ENV.isDev && console.log("modifyMyGood validate error", result);
    ctx.body = new ErrModel(ERR_RES.MY_STORE.DESTORY.ERR_ARGS_FORMAT);
    return;
  }
  ctx._request_payload = payload;
  await next();
}

async function getPage(ctx, next) {
  const payload = parse.toObj(ctx.request.query);
  const result = await validate.getPageOfMyStore(payload);
  if (!result.valid) {
    ENV.isDev && console.log("getMyGoodPage validate error", result);
    ctx.body = new ErrModel(ERR_RES.MY_STORE.READ.ERR_ARGS_FORMAT);
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
  addGood,
  removeGood,
  modifyGood,
  getPage,
};
