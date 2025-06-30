const S = require("../server");
const { query, SuccModel } = require("../utils");

async function readAll() {
  const types = await S.goodType.find(query.GOOD_TYPE.FIND.all());
  return new SuccModel({ data: { types } });
}

module.exports = {
  readAll,
};
