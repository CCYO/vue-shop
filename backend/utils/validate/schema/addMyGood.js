const { HOST, BASE_REF, SCHEMA_NAME } = require("../constant");

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
      type: "number",
    },
  },
  required: ["type_id", "name", "price", "total"],
  _notEmpty: ["type_id", "name", "price", "total"],
};

module.exports = { host: HOST, name: SCHEMA_NAME.addMyGood, json };
