const S = require("../server");
const C_goodType = require("./goodType");
const { query, SuccModel, ErrModel, MyErr } = require("../utils");
const { ERR_RES } = require("../config");

async function addGood(payload) {
  const { id } = await S.good.create(query.MY_STORE.ADD.one(payload));
  return await readGood({ id, seller_id: payload.seller_id });
}

async function removeGood(payload) {
  await S.good.destory(query.MY_STORE.REMOVE.one(payload));
  return new SuccModel();
}

async function modifyGood(data) {
  await S.good.update(query.MY_STORE.UPDATE.one(data));
  return new SuccModel();
}

async function readPage(payload) {
  const { count, goods } = await S.good.findAndCount(
    query.MY_STORE.READ.myStorePage(payload)
  );
  const result = {
    count,
    goods,
  };
  if (!payload.inited) {
    const { data } = await C_goodType.read();
    result.types = data;
  }
  return new SuccModel({ data: result });
}

async function readGood(payload) {
  const { id, seller_id } = payload;
  const [result] = await S.good.find(
    query.MY_STORE.READ.myGood({ id, seller_id })
  );
  let resModel;
  if (result) {
    resModel = new SuccModel({ data: { good: result } });
  } else {
    resModel = new ErrModel(ERR_RES.GOOD.READ.NO_ROW);
  }
  return resModel;
}

module.exports = {
  addGood,
  removeGood,
  modifyGood,
  readPage,
  readGood,
};
