const { HOST, BASE_REF, SCHEMA_NAME } = require("../../constant");

const json = {
  type: "object",
  properties: {
    id_list: {
      $ref: `${BASE_REF}/id_list`,
    },
  },
  required: ["id_list"],
  additionalProperties: false,
};

module.exports = { host: HOST, name: SCHEMA_NAME.shopping.order, json };
