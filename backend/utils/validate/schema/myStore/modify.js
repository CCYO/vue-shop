const { HOST, BASE_REF, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    _old: {
      type: "object",
    },
    seller_id: {
      type: "number",
    },
    id: {
      type: "number",
    },
    type_id: {
      type: "number",
    },
    name: {
      $ref: `${BASE_REF}/name`,
    },
    price: {
      $ref: `${BASE_REF}/price`,
    },
    total: {
      $ref: `${BASE_REF}/stock`,
    },
  },
  minProperties: 4,
  _notRepeat: ["type_id", "name", "price", "total"],
  required: ["id", "_old", "seller_id"],
};

module.exports = { host: HOST, name: SCHEMA_NAME.myStore.modify, json };
