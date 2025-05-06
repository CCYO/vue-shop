import base from "./base";

import register from "./register";
import login from "./login";

import addMyGood from "./addMyGood";
import modifyMyGood from "./modifyMyGood";
import removeMyGood from "./removeMyGood";
import readMyGoods from "./readMyGoods";
// base作為大部分schema的引用目標，一定放在第一個
export default [
  base,
  register,
  login,
  addMyGood,
  removeMyGood,
  modifyMyGood,
  readMyGoods,
];
