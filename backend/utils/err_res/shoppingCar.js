const CREATE = {
  ERR: {
    errno: 10499,
    msg: "建立shoppingCar數據時，發生錯誤",
  },
  ERR_ARGS_FORMAT: {
    errno: 10401,
    msg: "建立shoppingCar的row時，參數格式不符合校驗",
  },
};

const DESTORY = {
  ERR_ROW: {
    errno: 20401,
    msg: "刪除shoppingCar數據時，受影響的row不匹配",
  },
  ERR_ARGS_FORMAT: {
    errno: 20403,
    msg: "刪除shoppingCar的row時，參數格式不符合校驗",
  },
  ERR: {
    errno: 20499,
    msg: "刪除shoppingCar數據時，發生錯誤",
  },
};

const UPDATE = {
  ERR_ARGS_FORMAT_FOR_MODIFY: {
    errno: 30401,
    msg: "更新shoppingCar的row時，參數格式不符合校驗",
  },
  ERR_ARGS_FORMAT_FOR_ORDER: {
    errno: 30402,
    msg: "更新shoppingCar的row時(下單)，參數格式不符合校驗",
  },
  ERR_ROW: {
    errno: 30403,
    msg: "更改shoppingCar數據時，受影響的row不匹配",
  },
  ERR: {
    errno: 30499,
    msg: "更新shoppingCar數據時，發生錯誤",
  },
};

const FIND = {
  ERR_ARGS_FORMAT: {
    errno: 40401,
    msg: "查詢shoppingCar時，參數格式不符合校驗",
  },
  NO_ROWS: {
    errno: 40402,
    msg: "查詢shoppingCar數據時，找不到相符的數據",
  },
};

module.exports = {
  CREATE,
  DESTORY,
  UPDATE,
  FIND,
};
