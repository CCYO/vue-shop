export default function ({ host, name, json }) {
  return {
    ..._init(json),
    $id: `${host}/${name}.json`,
  };
}

function _init(json) {
  let kvPairs;
  let result;
  if (json.definitions) {
    kvPairs = json.definitions;
    result = { definitions: {} };
  } else if (json.properties) {
    let { properties, ...others } = _addErrorMessage(json);
    kvPairs = properties;
    result = { ...others, properties: {} };
  } else {
    return json;
  }
  const theValue = Object.entries(kvPairs).reduce((acc, [key, values]) => {
    acc[key] = _addErrorMessage(values);
    return acc;
  }, {});

  if (result.definitions) {
    result.definitions = theValue;
  } else {
    result.properties = theValue;
  }
  return result;
}

function _addErrorMessage(json) {
  // 複製一份，避免直接更改到原本引用的數據
  const res = { ...json };
  if (!res.errorMessage) {
    res.errorMessage = {};
  }
  const MSG = res.errorMessage;
  for (let key in res) {
    const VALUE = res[key];
    if (key === "regexp") {
      res.regexp = res.regexp.toString();
    } else if (key === "errorMessage" || res.errorMessage[key]) {
      continue;
    } else if (key === "type") {
      MSG[key] = `必須是${VALUE}類型`;
    }
    if (key === "minLength" || key === "maxLength") {
      if (
        ![res.minLength, res.maxLength].some((item) => typeof item !== "number")
      ) {
        MSG.minLength =
          MSG.maxLength = `必須介於${res.minLength}-${res.maxLength}個字符`;
      } else if (key === "minLength") {
        MSG[key] = `必須大於${VALUE}個字符`;
      } else {
        MSG[key] = `必須小於${VALUE}個字符`;
      }
    } else if (key === "minimum" || key === "maximum") {
      if (
        ![res.minimum, res.maximum].some((item) => typeof item !== "number")
      ) {
        MSG.minimum = MSG.maximum = `必須介於${res.minimum}-${res.maximum}之間`;
      } else if (key === "minimum") {
        MSG[key] = `必須大於${VALUE}`;
      } else {
        MSG[key] = `必須小於${VALUE}`;
      }
    } else if (key === "format") {
      MSG[key] = `必須符合${VALUE}格式`;
    } else if (key === "enum") {
      MSG[key] = `必須符合${VALUE}其中一種格式`;
    } else if (key === "required") {
      MSG[key] = "必填";
    } else if (key === "additionalProperties") {
      MSG[key] = `不被認列的數據`;
    } else if (key === "minProperties") {
      MSG[key] = `必須有${VALUE}項以上的校驗數據`;
    } else if (key === "minItems") {
      MSG[key] = `必須包含${VALUE}個以上的值`;
    } else if (key === "uniqueItems") {
      MSG[key] = `不可包含重複值`;
    } else if (key === "items") {
      if (Array.isArray(VALUE)) {
        continue;
      }
      const { type } = VALUE;
      // MSG[key] = { type: `必須由${type}類型的值組成` };
      MSG[key] = [`必須由${type}類型的值組成`];
    }
  }
  if (!Object.getOwnPropertyNames(res.errorMessage).length) {
    delete res.errorMessage;
  }
  return res;
}
