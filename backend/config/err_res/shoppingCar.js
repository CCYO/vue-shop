const READ = {
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
  READ,
};
