const { HOST, BASE_REF, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    password: {
      $ref: `${BASE_REF}/password`,
    },
  },
  required: ["id", "password"],
  additionalProperties: false,
};

module.exports = { host: HOST, name: SCHEMA_NAME.user.password, json };
