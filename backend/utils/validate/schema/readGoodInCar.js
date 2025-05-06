const { HOST, SCHEMA_NAME } = require("../constant");

const json = {
  type: "object",
  properties: {
    good_id: {
      type: "number",
    },
    seller_id: {
      type: "number",
    },
  },
  required: ["seller_id"],
  additionalProperties: false,
};

module.exports = { host: HOST, name: SCHEMA_NAME.readGoodInCar, json };
