import { HOST, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
    goods_id: {
      type: "number",
    },
    count: {
      type: "number",
      minimum: 1,
    },
  },
  required: ["goods_id", "count"],
  additionalProperties: false,
};

export default { host: HOST, name: SCHEMA_NAME.shopping.takeInCar, json };
