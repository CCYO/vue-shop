const MSG = {
  TYPE: {
    string: "必須是string",
    object: "必須是object",
    number: "必須是number",
    boolean: "必須是boolean",
  },
};

function _baseInit(json) {
  const res = { ...json };
  if (res.type) {
    if (!res.errorMessage) {
      res.errorMessage = {};
    }
    if (!res.errorMessage.type) {
      res.errorMessage.type = MSG.TYPE[res.type];
    }
    // res.errorMessage.type = `必須是${res.type}`;
  }
  if (res.minLength && res.maxLength) {
    res.errorMessage.maxLength =
      res.errorMessage.minLength = `必須介於${res.minLength}-${res.maxLength}個字符`;
  } else if (
    ![res.minimum, res.maximum].some((item) => typeof item !== "number")
  ) {
    res.errorMessage.minimum =
      res.errorMessage.maximum = `必須介於${res.minimum}-${res.maximum}之間`;
  }
  if (res.format) {
    res.errorMessage.format = `必須符合${res.format}格式`;
  }
  if (res.regexp instanceof RegExp) {
    res.regexp = res.regexp.toString();
  }
  if (res.required) {
    res.errorMessage.required = "必填";
  }
  return res;
}
module.exports = function ({ host, name, json }) {
  json = _baseInit(json);
  json.$id = `${host}/${name}.json`;
  let nest = json.definitions || json.properties;
  if (nest) {
    for (let prop in nest) {
      nest[prop] = _baseInit(nest[prop]);
    }
  }
  console.log(json);
  return json;
};
