const COMMON = require("../../common");

const { PERMISSION } = COMMON.ERR_RES;

const FIND = {
  NOT_LOGIN: {
    errno: 40901,
    msg: "未登入",
  },
  NEED_LOGIN: PERMISSION.FIND.NEED_LOGIN,
};

module.exports = {
  FIND,
};
