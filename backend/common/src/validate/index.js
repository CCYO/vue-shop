"use strict";
var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var _schemaList;
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const index$4 = require("./keywords/index.js");
const _2019 = require("../../_virtual/2019.js");
const index$3 = require("../../_virtual/index.js");
const index$2 = require("../../_virtual/index2.js");
const index$1 = require("../../_virtual/index3.js");
const _genSchema = require("./_genSchema.js");
const _check = require("./_check.js");
const attributes = require("./attributes.js");
class myAjv extends _2019.default {
  constructor(dataList, options) {
    super({
      allErrors: true,
      $data: true
    });
    __privateAdd(this, _schemaList);
    __publicField(this, "_validates", {});
    index$1.default(this);
    index$2.default(this);
    index$3.default(this);
    if (options == null ? void 0 : options.axios) {
      this.$$axios = options.axios;
    }
    index$4.default.forEach((keyword) => {
      this.addKeyword(keyword);
    });
    for (let data of dataList) {
      let { name } = data;
      const schema = _genSchema.default(data);
      this.addSchema(schema);
      if (!data.json.type) {
        continue;
      }
      let validate = this.getSchema(schema.$id);
      this._validates[name] = _check.default.bind(validate);
    }
  }
}
_schemaList = new WeakMap();
function genValidator(dataList, options) {
  const { _validates } = new myAjv(dataList, options);
  return _validates;
}
const index = { genValidator, attributes: attributes.default };
exports.default = index;
//# sourceMappingURL=index.js.map
