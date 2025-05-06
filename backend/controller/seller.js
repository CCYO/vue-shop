const S = require("../server");
const { query, SuccModel, ErrModel } = require("../utils");
const { ERR_RES } = require("../config");

// ADD
async function register(data) {
  const result = await S.seller.create(query.SELLER.ADD.register(data));
  return new SuccModel({ data: result });
}

// READ
async function login(data) {
  const [result] = await S.seller.find(query.SELLER.READ.login(data));
  if (!result) {
    return new ErrModel(ERR_RES.SELLER.READ.FAIL_LOGIN);
  }
  return new SuccModel({ data: result });
}

module.exports = {
  register,
  login,
};
