import { HOST, BASE_REF, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
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
    current_password: {
      $ref: `${BASE_REF}/password`,
    },
    new_password: {
      $ref: `${BASE_REF}/password`,
    },
  },
  minProperties: 1,
  dependencies: {
    current_password: ["new_password"],
    new_password: ["current_password"],
    avatar_hash: ["avatar_ext"],
    avatar_ext: ["avatar_hash"],
  },
  additionalProperties: false,
};

export default { host: HOST, name: SCHEMA_NAME.user.setting, json };
