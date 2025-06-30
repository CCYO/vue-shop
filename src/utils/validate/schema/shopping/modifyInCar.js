import { HOST, BASE_REF, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    goods_id: {
      type: "number",
    },
    count: {
      $ref: `${BASE_REF}/stock`,
    },
  },
  required: ["id", "goods_id", "count"],
  additionalProperties: false,
};

export default { host: HOST, name: SCHEMA_NAME.shopping.modifyInCar, json };
