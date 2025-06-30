import { HOST, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
    limit: {
      type: "number",
    },
    offset: {
      type: "number",
    },
    type: {
      type: "string",
    },
  },
  required: ["limit", "offset", "type"],
  additionalProperties: false,
};

export default { host: HOST, name: SCHEMA_NAME.shop.readPage, json };
