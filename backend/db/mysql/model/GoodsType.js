/**
 * @description Sequelize Model
 */
const seq = require("../seq");
const { STRING, INTEGER } = require("../_types");
const COMMON = require("../../../common");

const { NAME } = COMMON.validate.attributes;

module.exports = seq.define("GoodsType", {
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  ind: {
    type: INTEGER,
    allowNull: false,
    unique: true,
  },
  en: {
    type: STRING(NAME.maxLength),
    validate: {
      is: /\w+/,
      len: [NAME.minLength, NAME.maxLength],
    },
  },
  zh: {
    type: STRING(NAME.maxLength),
    validate: {
      is: NAME.regexp,
      len: [NAME.minLength, NAME.maxLength],
    },
  },
});
