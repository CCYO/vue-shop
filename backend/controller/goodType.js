const S = require("../server");
const { query, SuccModel } = require("../utils");

async function read(data) {
  if (!data) {
    return await _readAll();
  }
}

async function _readAll() {
  const result = await S.goodType.find(query.GOOD_TYPE.READ.all());
  return new SuccModel({ data: result });
}

module.exports = {
  read,
};
