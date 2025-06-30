const { HOST, BASE_REF, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    buyer_id: {
      type: "number",
    },
    goods_id: {
      type: "number",
    },
    count: {
      $ref: `${BASE_REF}/stock`,
    },
  },
  additionalProperties: false,
  required: ["id", "buyer_id", "goods_id", "count"],
};

module.exports = {
  host: HOST,
  name: SCHEMA_NAME.shopping.modify,
  json,
};
