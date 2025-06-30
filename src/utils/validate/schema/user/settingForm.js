import { HOST, BASE_REF, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
    _old: {
      type: "object",
    },
    name: {
      $ref: `${BASE_REF}/name`,
    },
    email: {
      $ref: `${BASE_REF}/email`,
    },
    city: {
      $ref: `${BASE_REF}/city`,
    },
    avatar_ext: {
      $ref: `${BASE_REF}/img_ext`,
    },
    avatar_hash: {
      $ref: `${BASE_REF}/hash`,
    },
    new_password: {
      $ref: `${BASE_REF}/password`,
    },
    new_password_again: {
      $ref: `${BASE_REF}/password`,
      type: "string",
      const: {
        $data: "1/new_password",
      },
      errorMessage: {
        const: "必須與新密碼相同",
      },
    },
  },
  _notRepeat: ["name", "avatar_hash", "email", "city"],
  minProperties: 2,
  dependencies: {
    avatar_hash: ["avatar_ext"],
    avatar_ext: ["avatar_hash"],
  },
  additionalProperties: false,
};

export default { host: HOST, name: SCHEMA_NAME.user.settingForm, json };
