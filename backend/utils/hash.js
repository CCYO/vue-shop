/**
 * @description 加密
 */

/* NPM         ----------------------------------------------------------------------------- */
const crypto = require("crypto");

//  針對STR MD5加密
const md5 = (data) => {
  const md5 = crypto.createHash("md5");
  return md5.update(data).digest("hex");
};

module.exports = {
  md5,
};
