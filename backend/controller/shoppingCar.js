const S = require("../server");
const { query, SuccModel, ErrModel, MyErr } = require("../utils");
const { ERR_RES } = require("../config");

async function read(payload) {
  const { good_id, seller_id } = payload;
  if (good_id && seller_id) {
    return await _readOne(payload);
  }
  //   僅有seller_id
  return await _readList(payload);
}

module.exports = {
  read,
};

async function _readList(payload) {
  const list = await S.shoppingCar.find(query.SHOPPING_CAR.READ.list(payload));
  if (list.length) {
    return new SuccModel({ data: { list } });
  } else {
    return new ErrModel(ERR_RES.SHOPPING_CAR.READ.NO_ROWS);
  }
}

async function _readOne(payload) {
  const [data] = await S.shoppingCar.find(query.SHOPPING_CAR.READ.one(payload));
  if (data) {
    return new SuccModel({ data });
  } else {
    return new ErrModel(ERR_RES.SHOPPING_CAR.READ.NO_ROWS);
  }
}
