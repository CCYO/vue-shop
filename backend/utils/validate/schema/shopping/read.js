const { HOST, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    goods_id: {
      type: "number",
    },
    buyer_id: {
      type: "number",
    },
  },
  required: ["buyer_id", "goods_id"],
  additionalProperties: false,
};

module.exports = { host: HOST, name: SCHEMA_NAME.shopping.read, json };
