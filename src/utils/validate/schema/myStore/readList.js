import { HOST, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
    type_id: {
      type: "number",
    },
    limit: {
      type: "number",
    },
    offset: {
      type: "number",
    },
    order: {
      type: "string",
      enum: ["type_zh", "name", "createdAt", "price"],
      errorMessage: {
        enum: "排序依據只能是type_zh、name、createdAt或price",
      },
    },
    sort: {
      type: "string",
      enum: ["asc", "desc"],
      errorMessage: {
        enum: "排序方式只能是升序或降序",
      },
    },
    inited: {
      type: "boolean",
    },
  },
  additionalProperties: false,
  required: ["limit", "offset", "order", "sort", "inited"],
};

export default { host: HOST, name: SCHEMA_NAME.myStore.readList, json };
