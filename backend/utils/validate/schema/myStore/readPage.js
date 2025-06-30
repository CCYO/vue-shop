const { HOST, SCHEMA_NAME } = require("../../constant");

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
      enum: ["type_zh", "name", "createdAt", "price"],
      errorMessage: {
        enum: "排序依據只能是商品類型、商品名稱、上架時間或價格",
      },
    },
    sort: {
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

module.exports = { host: HOST, name: SCHEMA_NAME.myStore.readPage, json };
