const { HOST, BASE_REF, SCHEMA_NAME } = require("../constant");

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
      $ref: `${BASE_REF}/hash`,
    },
    start: {
      $ref: `${BASE_REF}/star`,
    },
    avatar: {
      $ref: `${BASE_REF}/url`,
    },
    avatar_hash: {
      $ref: `${BASE_REF}/hash`,
    },
    city: {
      $ref: `${BASE_REF}/city`,
    },
  },
  required: ["email"],
};

module.exports = { host: HOST, name: SCHEMA_NAME.seller, json };
