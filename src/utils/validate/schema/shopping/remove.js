import { HOST, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
  },
  required: ["id"],
  additionalProperties: false,
};

export default { host: HOST, name: SCHEMA_NAME.shopping.remove, json };
