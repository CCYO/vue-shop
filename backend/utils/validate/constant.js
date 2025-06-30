const SCHEMA_NAME = {
  base: "base",

  user: {
    login: "user_login",
    register: "user_register",
    setting: "user_setting",
    password: "user_password",
  },

  myStore: {
    add: "myStore_add",
    remove: "myStore_remove",
    modify: "myStore_modify",
    readPage: "myStore_readPage",
  },

  goods: {
    readPage: "goods_readPage",
  },

  shopping: {
    add: "shopping_add",
    remove: "shopping_remove",
    modify: "shopping_modify",
    order: "shopping_order",
    readPage: "shopping_readPage",
    read: "shopping_read",
  },
};

const HOST = "http://backend_validate";
const BASE_REF = `${HOST}/${SCHEMA_NAME.base}.json#/definitions`;

module.exports = {
  HOST,
  SCHEMA_NAME,
  BASE_REF,
};
