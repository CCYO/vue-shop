import { HOST, BASE_REF, SCHEMA_NAME } from "../constant";

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

export default { host: HOST, name: SCHEMA_NAME.login, json };
