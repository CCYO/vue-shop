const S = require("../server");
const C_goodType = require("./goodType");
const { query, SuccModel } = require("../utils");

async function read(payload) {
  // 取得types
  if (payload.type) {
    return await _readTypePage(payload);
  } else {
    return await _readAll(payload);
  }
}

module.exports = {
  read,
};

async function _readTypePage(payload) {
  const model_goodType = await C_goodType.read();
  const model_count = await _readCount(payload);
  const result_good = await S.good.find(query.GOOD.READ.type(payload));
  const result = {
    types: model_goodType.data,
    goods: result_good,
    total: model_count.data,
  };
  return new SuccModel({ data: result });
}

async function _readCount(payload) {
  const _query = query.GOOD.READ.count(payload);
  const result = await S.good.count(_query);
  return new SuccModel({ data: result });
}

async function _readAll(data) {
  const _query = query.GOOD.READ.all(data);
  const result = S.good.find(_query);
  return new SuccModel({ data: result });
}
