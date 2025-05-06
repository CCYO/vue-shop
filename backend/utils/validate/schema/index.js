const base = require("./base");
const register = require("./register");
const login = require("./login");

const addMyGood = require("./addMyGood");
const removeMyGood = require("./removeMyGood");
const modifyMyGood = require("./modifyMyGood");
const getPageOfMyStore = require("./getPageOfMyStore");

const readGoodList = require("./readGoodList");

const readGoodInCar = require("./readGoodInCar");

// base作為大部分schema的引用目標，一定放在第一個
module.exports = [
  base,

  register,
  login,

  addMyGood,
  removeMyGood,
  modifyMyGood,
  getPageOfMyStore,

  readGoodList,

  readGoodInCar,
];
