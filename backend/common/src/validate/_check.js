"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const _2019 = require("../../_virtual/2019.js");
const _ERROR_PARAMS = require("./_ERROR_PARAMS.js");
const TOP_FIELD = "all";
async function _check(data, ignore_list = []) {
  let validated_errors = {};
  try {
    let validate = this;
    if (validate.$async) {
      await validate(data);
    } else {
      let valid = validate(data);
      if (!valid) {
        throw new _2019.default.ValidationError(validate.errors);
      }
    }
  } catch (invalid_errors) {
    if (invalid_errors instanceof _2019.default.ValidationError) {
      validated_errors = _init_errors(invalid_errors.errors);
    } else {
      throw invalid_errors;
    }
  }
  ignore_list = [...new Set(ignore_list).add("_old")];
  return _parseErrorsToForm(validated_errors, data, ignore_list);
}
function _init_errors(invalid_errors) {
  let acc = { [TOP_FIELD]: [] };
  let res = invalid_errors.reduce((acc2, invalid_error) => {
    let {
      //  原生狀況：顯示發生錯誤的keyword
      //  "errorMessage"：代表此校驗錯誤是ajv-errors預先設定的，而原生keyword能在paramsItem找到
      //  "myKeyword"：自訂義keyword
      keyword,
      //  依據keyword，params有不同內容
      //  "errorMessage"：代表此校驗錯誤是ajv-errors預先設定的，params內容為原生錯誤
      //  "myKeyword"：自訂義keyword所設計的params，
      ////  paramsItem { keyword: 自訂義keyword, params: { 自訂義的params-kvpairs } }
      params,
      //  JSON Pointer：代表被校驗的資料為主體，實際發生錯誤的位置(ex: "/email")
      //  ""：代表指向的錯誤位置，高過於被校驗的資料的級別(ex: schema.if)
      //  無論是否自訂義keyword，都是自動生成
      instancePath,
      //  依據keyword，params有不同內容
      //  原生狀況：錯誤提醒
      //  "errorMessage"：ajv-errors預先設定的錯誤提醒
      //  "myKeyword"：自訂義keyword的校驗函數設定錯誤提醒
      message
    } = invalid_error;
    if (!["errorMessage", "myKeyword"].some((item) => item === keyword)) {
      console.warn(`keyword「${keyword}」沒有設置錯誤訊息，請檢查！`);
      return acc2;
    }
    let { errors } = params;
    if (!instancePath) {
      errors.reduce((_acc, error) => {
        let { keyword: origin_keyword2, params: origin_params } = error;
        let paramKey = _ERROR_PARAMS.default[origin_keyword2];
        let field_name2 = origin_params[paramKey];
        let item = _acc.find(({ keyword: keyword2 }) => keyword2 === origin_keyword2);
        if (!item) {
          _acc.push({ keyword: origin_keyword2, list: [field_name2], message });
        } else {
          item.list.push(field_name2);
        }
        return _acc;
      }, acc2[TOP_FIELD]);
      return acc2;
    }
    let { keyword: origin_keyword } = errors[0];
    let field_name = instancePath.split("/").pop();
    if (!acc2[field_name]) {
      acc2[field_name] = [];
    }
    if (!acc2[field_name].some(({ keyword: keyword2 }) => keyword2 === origin_keyword)) {
      acc2[field_name].push({ keyword: origin_keyword, message });
    }
    return acc2;
  }, acc);
  return res;
}
function _parseErrorsToForm(invalid_errors, data, ignore_list = []) {
  let valid_list = Object.keys(data);
  let res_list = [];
  res_list.valid = !Object.getOwnPropertyNames(invalid_errors).length;
  if (!res_list.valid) {
    for (let error of invalid_errors[TOP_FIELD]) {
      let { keyword, message, list } = error;
      for (let field_name of list) {
        if (!invalid_errors[field_name] || !invalid_errors[field_name].top) {
          invalid_errors[field_name] = {
            message,
            top: true,
            keyword: [keyword]
          };
        } else {
          invalid_errors[field_name].message += `,${message}`;
          invalid_errors[field_name].keyword.push(keyword);
        }
      }
    }
    delete invalid_errors[TOP_FIELD];
    for (let field_name in invalid_errors) {
      valid_list = valid_list.filter((item) => item !== field_name);
    }
  }
  for (let field_name of ignore_list) {
    valid_list = valid_list.filter((item) => item !== field_name);
    delete invalid_errors[field_name];
  }
  for (let field_name in invalid_errors) {
    let field_error = invalid_errors[field_name];
    let keyword_and_message;
    if (field_error.top) {
      keyword_and_message = {
        message: field_error.message += "。",
        keyword: field_error.keyword
      };
    } else {
      keyword_and_message = field_error.reduce(
        (acc, { message, keyword }, index) => {
          acc.keyword.push(keyword);
          if (!index) {
            acc.message = message;
            return acc;
          }
          acc.message += `,${message}`;
          if (index === field_error.length - 1) {
            acc.message += "。";
          }
          return acc;
        },
        { keyword: [], message: "" }
      );
    }
    let item = {
      field_name,
      value: data[field_name],
      valid: false,
      ...keyword_and_message
    };
    res_list.push(item);
  }
  for (let field_name of valid_list) {
    res_list.push({ field_name, valid: true, value: data[field_name] });
  }
  return res_list;
}
exports.default = _check;
//# sourceMappingURL=_check.js.map
