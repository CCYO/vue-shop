/* CONFIG      ----------------------------------------------------------------------------- */
const { COMMON } = require("../../config");
const schemaList = require("./schema");

module.exports = COMMON.validate.genValidator(schemaList);
