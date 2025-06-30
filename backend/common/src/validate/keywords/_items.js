"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const _ERROR_PARAMS = require("../_ERROR_PARAMS.js");
const keyword = "_items";
function validate(schema, data, parentSchema, dataCtx) {
  const {
    // 不知道是啥
    dynamicAnchors,
    // 推測／被當前schema校驗的整個data
    rootData,
    // 推測／包含當前data的父級數據
    parentData,
    // 推測／parentData的key
    parentDataProperty,
    // 推測／當前data位於rootData的位置
    instancePath
  } = dataCtx;
  if (!["string", "number", "boolean"].some((item) => item === schema)) {
    console.warn("keyword「_items」的schema值只能指定 string|number|boolean");
  }
  const invalid = data.some((item) => {
    return typeof item !== schema;
  });
  if (invalid) {
    validate.errors = [
      {
        keyword: "myKeyword",
        message: `必須由${schema}類型組成`,
        params: {
          errors: [
            {
              keyword,
              params: { [_ERROR_PARAMS.default._items]: instancePath.split("/").pop() }
            }
          ]
        }
      }
    ];
  }
  return !invalid;
}
const _items = {
  keyword,
  type: "array",
  schemaType: "string",
  validate,
  errors: true
};
exports.default = _items;
//# sourceMappingURL=_items.js.map
