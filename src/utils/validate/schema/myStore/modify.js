import { HOST, BASE_REF, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
    _old: {
      type: "object",
    },
    id: {
      type: "number",
    },
    type_id: {
      type: "number",
    },
    name: {
      $ref: `${BASE_REF}/name`,
    },
    price: {
      $ref: `${BASE_REF}/price`,
    },
    total: {
      $ref: `${BASE_REF}/stock`,
    },
  },
  minProperties: 3,
  _notRepeat: ["type_id", "name", "price", "total"],
  required: ["id", "_old"],
};

export default { host: HOST, name: SCHEMA_NAME.myStore.modify, json };
