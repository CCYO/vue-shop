import ERROR_PARAMS from "../_ERROR_PARAMS";

const keyword = "_notRepeat";
const message = "沒有要改就別鬧了";

function validate(schema, data, parentSchema, dataCtx) {
  let { _old } = data;
  if (!_old) {
    console.warn("來自 keyword _notEmpty 的警告，驗證數據未提供 _old");
    return true;
  }
  let error = { keyword: "myKeyword", message };
  let params_errors = Object.entries(data).reduce((acc, [prorperty, value]) => {
    let valid = true;
    if (schema.includes(prorperty)) {
      let _value = _old[prorperty];
      if (typeof _value === "number") {
        value *= 1;
      }
      valid = value !== _old[prorperty];
    }
    if (!valid) {
      acc.push({
        keyword,
        params: { [ERROR_PARAMS._notRepeat]: prorperty },
      });
    }
    return acc;
  }, []);
  if (params_errors.length) {
    error.params = { errors: params_errors };
    validate.errors = [error];
  }
  return !params_errors.length;
}

export default {
  keyword,
  //    data type
  type: "object",
  //    schema 針對此 keyword 設定的格式限制
  schemaType: "array",
  validate,
  errors: true,
};
