const CREATE = {
  ERR: {
    errno: 10299,
    msg: "建立good數據時，發生錯誤",
  },
};
const DESTORY = {
  ERR_ROW: {
    errno: 20201,
    msg: "刪除good數據時，受影響的row不匹配",
  },
  ERR: {
    errno: 20299,
    msg: "刪除good數據時，發生錯誤",
  },
};
const UPDATE = {
  ERR_ROW: {
    errno: 30201,
    msg: "更改good數據時，受影響的row不匹配",
  },
  ERR: {
    errno: 30299,
    msg: "更新good數據時，發生錯誤",
  },
};
const FIND = {
  ERR_ARGS_FORMAT: {
    errno: 40201,
    msg: "查詢good數據時，參數格式不符合校驗",
  },
  NO_ROW: {
    errno: 40202,
    msg: "查詢good數據時，找不到相符的數據",
  },
};
module.exports = {
  CREATE,
  DESTORY,
  UPDATE,
  FIND,
};
