import ERROR_PARAMS from "../_ERROR_PARAMS";
const keyword = "_items";
let message;

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
    instancePath,
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
              params: { [ERROR_PARAMS._items]: instancePath.split("/").pop() },
            },
          ],
        },
      },
    ];
  }

  return !invalid;
}

export default {
  keyword,
  type: "array",
  schemaType: "string",
  validate,
  errors: true,
};
