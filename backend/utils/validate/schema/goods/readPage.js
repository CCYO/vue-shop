const { HOST, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    type: {
      type: "string",
    },
    offset: {
      type: "number",
    },
    limit: {
      type: "number",
    },
  },
  additionalProperties: false,
  required: ["type", "offset", "limit"],
};

module.exports = { host: HOST, name: SCHEMA_NAME.goods.readPage, json };
