const { HOST, BASE_REF, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    _old: {
      type: "object",
    },
    id: {
      type: "number",
    },
    email: {
      $ref: `${BASE_REF}/email`,
    },
    name: {
      $ref: `${BASE_REF}/name`,
    },
    password: {
      $ref: `${BASE_REF}/password`,
    },
    avatar_ext: {
      $ref: `${BASE_REF}/imgExt`,
    },
    avatar_hash: {
      $ref: `${BASE_REF}/hash`,
    },
    city: {
      $ref: `${BASE_REF}/city`,
    },
  },
  minProperties: 2,
  required: ["_old", "id"],
  _notRepeat: ["email", "name", "avatar_hash", "city"],
  dependentRequired: {
    avatar_hash: ["avatar_ext"],
    avatar_ext: ["avatar_hash"],
  },
};

module.exports = { host: HOST, name: SCHEMA_NAME.user.setting, json };
