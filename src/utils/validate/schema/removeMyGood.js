import { HOST, SCHEMA_NAME } from "../constant";

const json = {
  type: "object",
  properties: {
    id: {
      type: "number",
    },
    type_id: {
      type: "number",
    },
  },
  required: ["id", "type_id"],
  _notEmpty: ["id", "type_id"],
  additionalProperties: false,
};

export default { host: HOST, name: SCHEMA_NAME.removeMyGood, json };
