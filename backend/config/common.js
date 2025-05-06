const { isProd } = require("./env");

let common;

if (isProd) {
  common = require("../../common/dist/common.cjs");
} else {
  common = require("../../common/dist/dev_common.cjs");
}

module.exports = common;
