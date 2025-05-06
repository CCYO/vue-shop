// import default_schema from "./schema";
import keyword_list from "./keywords";
import Ajv2019 from "ajv/dist/2019";
import addFormats from "ajv-formats";
import AjvErrors from "ajv-errors";
import AjvKeywords from "ajv-keywords";

import _genSchema from "./_genSchema";
import _check from "./_check";

// 封裝一個處理錯誤的校驗器
class myAjv extends Ajv2019 {
  #schemaList = undefined;
  _validates = {};
  constructor(dataList, options) {
    //  建立ajv instance
    super({
      allErrors: true,
      $data: true,
    });
    AjvKeywords(this);
    //  添加功能:自定義錯誤提示
    AjvErrors(this);
    //  添加format關鍵字
    addFormats(this);

    //  添加axios(async性質的schema需要用到)
    if (options?.axios) {
      this.$$axios = options.axios;
    }

    //  添加自定義關鍵字
    keyword_list.forEach((keyword) => {
      this.addKeyword(keyword);
    });

    for (let data of dataList) {
      let { name } = data;
      const schema = _genSchema(data);
      this.addSchema(schema);
      if (!data.json.type) {
        continue;
      }
      let validate = this.getSchema(schema.$id);
      this._validates[name] = _check.bind(validate);
    }
  }
}

function genValidator(dataList, options) {
  const { _validates } = new myAjv(dataList, options);
  return _validates;
}

import attributes from "./attributes";

export default { genValidator, attributes };
