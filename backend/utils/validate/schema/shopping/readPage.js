const { HOST, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    limit: {
      type: "number",
    },
    offset: {
      type: "number",
    },
    buyer_id: {
      type: "number",
    },
    order: {
      type: "boolean",
    },
  },
  required: ["limit", "offset", "buyer_id", "order"],
  additionalProperties: false,
};

module.exports = { host: HOST, name: SCHEMA_NAME.shopping.readPage, json };
