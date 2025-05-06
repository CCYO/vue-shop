const CREATE = {
  ERR: {
    errno: 10199,
    msg: "建立seller數據時，發生錯誤",
  },
  ERR_REGISTER_FORMAT: {
    errno: 10101,
    msg: "註冊時，參數格式不符合校驗",
  },
};
const DESTORY = {
  // ERR_ROW: {
  //   errno: 20101,
  //   msg: "刪除good數據時，受影響的row不匹配",
  // },
  // ERR: {
  //   errno: 20199,
  //   msg: "刪除good數據時，發生錯誤",
  // },
};
const UPDATE = {
  // ERR_ROW: {
  //   errno: 30101,
  //   msg: "更改good數據時，受影響的row不匹配",
  // },
  // ERR: {
  //   errno: 30199,
  //   msg: "更新good數據時，發生錯誤",
  // },
};
const READ = {
  FAIL_LOGIN: {
    errno: 40101,
    msg: "登入時，帳號或密碼錯誤",
  },
  ERR_LOGIN_FORMAT: {
    errno: 40102,
    msg: "登入時，參數格式不符合校驗",
  },
};
module.exports = {
  CREATE,
  DESTORY,
  UPDATE,
  READ,
};
