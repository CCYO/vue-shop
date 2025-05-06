const { COMMON } = require("../../../config");
const { SCHEMA_NAME, HOST } = require("../constant");

const { attributes } = COMMON.validate;

const json = {
  definitions: {
    email: attributes.EMAIL,
    name: attributes.NAME,
    city: attributes.CITY,
    star: attributes.STAR,
    avatar: attributes.URL_ADDR,
    hash: attributes.HASH,
    url: attributes.URL_ADDR,
    password: attributes.PASSWORD,
    price: attributes.PRICE,
    stock: attributes.STOCK,
  },
};

module.exports = { host: HOST, name: SCHEMA_NAME.base, json };
