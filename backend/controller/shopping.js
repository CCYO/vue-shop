const S = require("../server");
const { query, SuccModel, ErrModel, ERR_RES } = require("../utils");

async function add(payload) {
  const { count, goods_id, id } = await S.shopping.create(
    query.SHOPPING_CAR.CREATE.one(payload)
  );
  const item = { count, goods_id, id };
  return new SuccModel({ data: { item } });
}

async function remove(payload) {
  await S.shopping.destory(query.SHOPPING_CAR.DESTORY.one(payload));
  return new SuccModel();
}

async function modify(payload) {
  await S.shopping.update(query.SHOPPING_CAR.UPDATE.one(payload));
  return new SuccModel();
}

async function order(payload) {
  const updateNum = payload.id_list.length;
  await S.shopping.bulkUpdate(
    query.SHOPPING_CAR.UPDATE.order(payload),
    updateNum
  );
  return new SuccModel();
}

async function readOne(payload) {
  const { count, list } = await S.shopping.findAndCount(
    query.SHOPPING_CAR.FIND.one(payload)
  );
  if (count) {
    const [data] = list;
    return new SuccModel({ data });
  } else {
    return new ErrModel(ERR_RES.SHOPPING_CAR.FIND.NO_ROWS);
  }
}

async function readListInCar(payload) {
  const { list, count } = await S.shopping.findAndCount(
    query.SHOPPING_CAR.FIND.readListOfShoppingCar(payload)
  );
  return new SuccModel({ data: { list, count } });
}

module.exports = {
  add,
  remove,
  modify,
  order,
  readOne,
  readListInCar,
};
