import { HOST, BASE_REF, SCHEMA_NAME } from "../constant";

const json = {
  type: "object",
  properties: {
    email: {
      $ref: `${BASE_REF}/email`,
    },
    name: {
      $ref: `${BASE_REF}/name`,
    },
    password: {
      $ref: `${BASE_REF}/password`,
    },
    checkPassword: {
      type: "string",
      const: {
        $data: "1/password",
      },
      errorMessage: {
        const: "請再次確認密碼是否相同",
      },
    },
  },
  required: ["email", "name", "password", "checkPassword"],
  _notEmpty: ["email", "name", "password", "checkPassword"],
};

export default { host: HOST, name: SCHEMA_NAME.register, json };
