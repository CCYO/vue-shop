const { HOST, SCHEMA_NAME } = require("../constant");

const json = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
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
};

module.exports = { host: HOST, name: SCHEMA_NAME.readGoodList, json };
