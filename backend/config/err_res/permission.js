const COMMON = require("../common.js");
const { PERMISSION } = COMMON.ERR_RES;

const READ = {
  NOT_LOGIN: {
    errno: 40901,
    msg: "未登入",
  },
  NEED_LOGIN: PERMISSION.READ.NEED_LOGIN,
};

module.exports = {
  READ,
};
