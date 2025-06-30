const { HOST, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    buyer_id: {
      type: "number",
    },
    goods_id: {
      type: "number",
    },
    count: {
      type: "number",
      minimum: 1,
    },
  },
  additionalProperties: false,
  required: ["buyer_id", "goods_id", "count"],
};

module.exports = { host: HOST, name: SCHEMA_NAME.shopping.add, json };
