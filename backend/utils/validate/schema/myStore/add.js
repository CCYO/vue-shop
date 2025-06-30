const { HOST, BASE_REF, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
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
  required: ["type_id", "name", "price", "total"],
  _notEmpty: ["type_id", "name", "price", "total"],
};

module.exports = { host: HOST, name: SCHEMA_NAME.myStore.add, json };
