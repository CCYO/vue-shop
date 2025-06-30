const S = require("../server");
const { query, SuccModel, ErrModel, ERR_RES } = require("../utils");

// ADD
async function register(data) {
  const result = await S.user.create(query.USER.CREATE.register(data));
  return new SuccModel({ data: result });
}

async function setting(data) {
  await S.user.update(query.USER.UPDATE.one(data));
  const [item] = await S.user.find(query.USER.FIND.responseBySetting(data.id));
  return new SuccModel({ data: { item } });
}

async function checkPassword(payload) {
  const [result] = await S.user.find(query.USER.FIND.checkPassword(payload));
  if (!result) {
    return new ErrModel(ERR_RES.USER.FIND.ERR_CHECK_PASSWORD);
  }
  return new SuccModel();
}
// READ
async function login(data) {
  const [result] = await S.user.find(query.USER.FIND.login(data));
  if (!result) {
    return new ErrModel(ERR_RES.USER.FIND.FAIL_LOGIN);
  }
  return new SuccModel({ data: result });
}

module.exports = {
  register,
  setting,
  login,
  checkPassword,
};
