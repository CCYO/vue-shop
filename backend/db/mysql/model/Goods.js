/**
 * @description Sequelize Model
 */
const seq = require("../seq");
const { STRING, INTEGER, BOO, DATE } = require("../_types");
const COMMON = require("../../../common");

const { NAME, PRICE, STOCK, STAR } = COMMON.validate.attributes;

module.exports = seq.define(
  "Goods",
  {
    type_id: {
      type: INTEGER,
      allowNull: false,
    },
    seller_id: {
      type: INTEGER,
      allowNull: false,
    },
    name: {
      type: STRING(NAME.maxLength),
      allowNull: false,
      validate: {
        is: NAME.regexp,
        len: [NAME.minLength, NAME.maxLength],
      },
    },
    picture: {
      type: STRING,
      validate: {
        isUrl: true,
      },
    },
    price: {
      allowNull: false,
      type: INTEGER,
      defaultValue: 0,
      validate: {
        min: PRICE.minimum,
        max: PRICE.maximum,
      },
    },
    total: {
      type: INTEGER,
      allowNull: false,
      defaultValue: STOCK.minimum,
      validate: {
        min: STOCK.minimum,
        max: STOCK.maximum,
      },
    },
    selled: {
      allowNull: false,
      type: INTEGER,
      defaultValue: STOCK.minimum,
      validate: {
        min: STOCK.minimum,
        max: STOCK.maximum,
      },
    },
    star: {
      type: INTEGER,
      validate: {
        min: STAR.minimum,
        max: STAR.maximum,
      },
    },
    on: {
      type: BOO,
      defaultValue: false,
    },
    onTime: {
      type: DATE,
    },
  },
  {
    paranoid: true,
  }
);
