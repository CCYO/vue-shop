import { HOST, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
    goods_id: {
      type: "number",
    },
  },
  required: ["goods_id"],
  additionalProperties: false,
};

export default { host: HOST, name: SCHEMA_NAME.shopping.read, json };
