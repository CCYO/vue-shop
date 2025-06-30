import { HOST, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
    order: {
      type: "boolean",
    },
    limit: {
      type: "number",
    },
    offset: {
      type: "number",
    },
  },
  required: ["limit", "offset", "order"],
  additionalProperties: false,
};

export default { host: HOST, name: SCHEMA_NAME.shopping.readPage, json };
