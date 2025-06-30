const CREATE = {
  ERR_ARGS_FORMAT: {
    errno: 10301,
    msg: "建立myStore的good時，參數格式不符合校驗",
  },
};

const DESTORY = {
  ERR_ARGS_FORMAT: {
    errno: 20301,
    msg: "刪除myStore的good時，參數格式不符合校驗",
  },
};

const UPDATE = {
  ERR_ARGS_FORMAT: {
    errno: 30301,
    msg: "更新myStore的good時，參數格式不符合校驗",
  },
};

const FIND = {
  ERR_ARGS_FORMAT: {
    errno: 40301,
    msg: "查詢myStore時，參數格式不符合校驗",
  },
};
module.exports = {
  CREATE,
  DESTORY,
  UPDATE,
  FIND,
};
