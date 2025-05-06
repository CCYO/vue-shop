const SCHEMA_NAME = {
  base: "base",
  seller: "seller",
  login: "login",
  register: "register",

  addMyGood: "addMyGood",
  removeMyGood: "removeMyGood",
  modifyMyGood: "modifyMyGood",
  readMyGoods: "readMyGoods",
};

const HOST = "http://frontend_validate";
const BASE_REF = `${HOST}/${SCHEMA_NAME.base}.json#/definitions`;

export { HOST, SCHEMA_NAME, BASE_REF };
