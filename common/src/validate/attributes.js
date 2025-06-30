const REGEXP = {
  // \u2F00-\u2FD5 部首
  // \u3105-\u312F 注音
  // \u4E00-\u9FFF 繁簡中字
  ch_and_keywordW: {
    regexp: /^[\u2F00-\u2FD5\u3105-\u312F\u4E00-\u9FFF\w\-]+$/,
    message: "必須由中文、英文、數字以及底線與連接線組成",
  },
  hash: {
    regexp: /^[0-9a-f]{32,32}$/,
    message: "必須由符合hash格式",
  },
};

const NAME = {
  type: "string",
  minLength: 1,
  maxLength: 20,
  regexp: REGEXP.ch_and_keywordW.regexp,
  errorMessage: {
    regexp: REGEXP.ch_and_keywordW.message,
  },
};

const CITY = {
  type: "string",
  minLength: 1,
  maxLength: 20,
  regexp: REGEXP.ch_and_keywordW.regexp,
  errorMessage: {
    regexp: REGEXP.ch_and_keywordW.message,
  },
};

const STAR = {
  type: "number",
  minimum: 1,
  maximum: 5,
};

const URL_ADDR = {
  type: "string",
  format: "url",
};

const HASH = {
  type: "string",
  regexp: REGEXP.hash.regexp,
  errorMessage: {
    regexp: REGEXP.hash.message,
  },
};

const IMG_EXT = {
  enum: ["jpg", "jpeg", "png"],
};

const EMAIL = {
  type: "string",
  format: "email",
};

const PRICE = {
  type: "number",
  minimum: 0,
  maximum: 1000000,
};

const STOCK = {
  type: "number",
  minimum: 0,
  maximum: 1000000,
};

const PASSWORD = {
  type: "string",
  minLength: 6,
  maxLength: 20,
};

const ID_LIST = {
  type: "array",
  minItems: 1,
  uniqueItems: true,
  _items: "number",
};

export default {
  REGEXP,
  PASSWORD,
  NAME,
  CITY,
  STAR,
  URL_ADDR,
  HASH,
  EMAIL,
  PRICE,
  STOCK,
  IMG_EXT,
  ID_LIST,
};
