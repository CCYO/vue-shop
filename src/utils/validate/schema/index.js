import base from "./base";

import USER from "./user";
import SHOP from "./shop";
import SHOPPING from "./shopping";
import MY_STORE from "./myStore";

// base作為大部分schema的引用目標，一定放在第一個
export default [base, ...USER, ...SHOP, ...SHOPPING, ...MY_STORE];
