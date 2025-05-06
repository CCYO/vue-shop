import ERROR_PARAMS from "../_ERROR_PARAMS";

const keyword = "_notEmpty";
const message = "必填";

function validate(schema, data, parentSchema, dataCtx) {
  let error = { keyword: "myKeyword", message };
  let params_errors = Object.entries(data).reduce((acc, [prorperty, value]) => {
    let valid = true;
    if (typeof value === "string") {
      valid = !!value.trim().length;
    }

    if (!valid) {
      acc.push({
        keyword,
        params: { [ERROR_PARAMS._notEmpty]: prorperty },
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
  type: "object",
  schemaType: "array",
  validate,
  errors: true,
};
