const S = require("../server");
const C_goodType = require("./goodType");
const { query, SuccModel } = require("../utils");

async function readPageOfType(payload) {
  const {
    data: { types },
  } = await C_goodType.readAll();
  const { count, list } = await S.goods.findAndCount(
    query.GOODS.FIND.pageOfGoodType(payload)
  );
  const data = { types, list, count };
  return new SuccModel({ data });
}

module.exports = {
  readPageOfType,
};
