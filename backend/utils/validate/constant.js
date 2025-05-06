const SCHEMA_NAME = {
  base: "base",
  login: "login",
  register: "register",

  addMyGood: "addMyGood",
  removeMyGood: "removeMyGood",
  modifyMyGood: "modifyMyGood",
  getPageOfMyStore: "getPageOfMyStore",

  readGoodList: "readGoodList",

  readGoodInCar: "readGoodInCar",
};

const HOST = "http://backend_validate";
const BASE_REF = `${HOST}/${SCHEMA_NAME.base}.json#/definitions`;

module.exports = {
  HOST,
  SCHEMA_NAME,
  BASE_REF,
};
