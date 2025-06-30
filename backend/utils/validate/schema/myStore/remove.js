const { HOST, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    type_id: {
      type: "number",
    },
  },
  required: ["id", "type_id"],
  _notEmpty: ["id", "type_id"],
  additionalProperties: false,
};

module.exports = { host: HOST, name: SCHEMA_NAME.myStore.remove, json };
