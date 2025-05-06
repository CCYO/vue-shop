const { HOST, SCHEMA_NAME } = require("../constant");

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
      enum: ["type_id", "createdAt", "price"],
      errorMessage: {
        enum: "排序依據只能是type_id、createdAt或price",
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
      errorMessage: "必須是boolean",
    },
  },
  additionalProperties: false,
  required: ["limit", "offset", "order", "sort", "inited"],
};

module.exports = { host: HOST, name: SCHEMA_NAME.getPageOfMyStore, json };
