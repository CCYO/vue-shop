/* CONFIG      ----------------------------------------------------------------------------- */
const { validate } = require("../../common");
const schemaList = require("./schema");

module.exports = validate.genValidator(schemaList);
