const { validate } = require("../../../common");
const { SCHEMA_NAME, HOST } = require("../constant");

const { attributes } = validate;

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
    imgExt: attributes.IMG_EXT,
    id_list: attributes.ID_LIST,
  },
};

module.exports = { host: HOST, name: SCHEMA_NAME.base, json };
