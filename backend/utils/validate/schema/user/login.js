const { HOST, BASE_REF, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    email: {
      $ref: `${BASE_REF}/email`,
    },
    password: {
      $ref: `${BASE_REF}/password`,
    },
  },
  required: ["email", "password"],
  _notEmpty: ["email", "password"],
};

module.exports = { host: HOST, name: SCHEMA_NAME.user.login, json };
