const { HOST, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
  },
  required: ["id"],
  additionalProperties: false,
};

module.exports = { host: HOST, name: SCHEMA_NAME.shopping.remove, json };
