import COMMON from "@/common";
import { SCHEMA_NAME, HOST } from "../constant";

const { attributes } = COMMON.validate;

const json = {
  definitions: {
    email: attributes.EMAIL,
    name: attributes.NAME,
    city: attributes.CITY,
    star: attributes.STAR,
    hash: attributes.HASH,
    url: attributes.URL_ADDR,
    password: attributes.PASSWORD,
    price: attributes.PRICE,
    stock: attributes.STOCK,
    img_ext: attributes.IMG_EXT,
    id_list: attributes.ID_LIST,
  },
};

export default { host: HOST, name: SCHEMA_NAME.base, json };
