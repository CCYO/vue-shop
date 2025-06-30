import { HOST, BASE_REF, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
    id_list: {
      type: "array",
      minItems: 1,
    },
  },
  required: ["id_list"],
  additionalProperties: false,
};

export default { host: HOST, name: SCHEMA_NAME.shopping.order, json };
