const S = require("../server");
const C_goodType = require("./goodType");
const { query, SuccModel, ErrModel, ERR_RES } = require("../utils");

async function addGood(payload) {
  const { id } = await S.goods.create(query.MY_STORE.CREATE.one(payload));
  return await readGood({ id });
}

async function removeGood(payload) {
  await S.goods.destory(query.MY_STORE.DESTORY.one(payload));
  return new SuccModel();
}

async function modifyGood(data) {
  await S.goods.update(query.MY_STORE.UPDATE.one(data));
  return new SuccModel();
}

async function readPage(payload) {
  const { count, list } = await S.goods.findAndCount(
    query.MY_STORE.FIND.myStorePage(payload)
  );
  const result = {
    count,
    list,
  };
  if (!payload.inited) {
    const {
      data: { types },
    } = await C_goodType.readAll();
    result.types = types;
  }
  return new SuccModel({ data: result });
}

async function readGood(payload) {
  const {
    list: [item],
  } = await S.goods.findAndCount(query.MY_STORE.FIND.myGood(payload));
  let resModel;
  if (item) {
    resModel = new SuccModel({ data: { item } });
  } else {
    resModel = new ErrModel(ERR_RES.GOODS.FIND.NO_ROW);
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
