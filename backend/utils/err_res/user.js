const CREATE = {
  ERR: {
    errno: 10199,
    msg: "建立user數據時，發生錯誤",
  },
  ERR_REGISTER_FORMAT: {
    errno: 10101,
    msg: "註冊時，參數格式不符合校驗",
  },
};
const UPDATE = {
  ERR_SETTING_FORMAT: {
    errno: 30101,
    msg: "更改user數據時，參數格式不符合校驗",
  },
  ERR_ROW: {
    errno: 30102,
    msg: "更改user數據時，受影響的row不匹配",
  },
  ERR_AVATAR_MIMETYPE: {
    errno: 30103,
    msg: "更改user avatar數據時，mimetype格式不符合校驗",
  },
  ERR_FORMIDABLE_PARSE: {
    errno: 30104,
    msg: "更改user avatar數據時，調用formidable時發生錯誤",
  },
  ERR_GFB_UPLOAD: {
    errno: 30105,
    msg: "更改user avatar數據時，將圖片上傳google firebase失敗",
  },
  ERR: {
    errno: 30199,
    msg: "更新user數據時，發生錯誤",
  },
};
const FIND = {
  FAIL_LOGIN: {
    errno: 40101,
    msg: "登入時，帳號或密碼錯誤",
  },
  ERR_LOGIN_FORMAT: {
    errno: 40102,
    msg: "登入時，參數格式不符合校驗",
  },
  ERR_PASSWORD_FORMAT: {
    errno: 40103,
    msg: "驗證當前密碼時，參數格式不符合校驗",
  },
  ERR_CHECK_PASSWORD: {
    errno: 40104,
    msg: "密碼錯誤",
  },
};
module.exports = {
  CREATE,
  UPDATE,
  FIND,
};
