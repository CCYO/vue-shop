const base = require("./base");

const user = require("./user");
const myStore = require("./myStore");
const shopping = require("./shopping");
const goods = require("./goods");

// base作為大部分schema的引用目標，一定放在第一個
module.exports = [base, ...user, ...myStore, ...shopping, ...goods];
