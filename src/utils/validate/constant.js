const SCHEMA_NAME = {
  base: "base",

  user: {
    register: "user_register",
    login: "user_login",
    password: "user_password",
    avatar: "user_avatar",
    settingForm: "user_settingForm",
    setting: "user_setting",
  },

  shop: {
    readPage: "shop_readPage",
  },

  shopping: {
    takeInCar: "shopping_takeInCar",
    remove: "shopping_remove",
    modifyInCar: "shopping_modifyInCar",
    order: "shopping_order",
    readPage: "shopping_readPage",
    read: "shopping_read",
  },

  myStore: {
    add: "myStore_add",
    modify: "myStore_modify",
    remove: "myStore_remove",
    readList: "myStore_readList",
  },
};

const HOST = "http://frontend_validate";
const BASE_REF = `${HOST}/${SCHEMA_NAME.base}.json#/definitions`;

export { HOST, SCHEMA_NAME, BASE_REF };
