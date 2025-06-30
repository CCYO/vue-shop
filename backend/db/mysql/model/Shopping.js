/**
 * @description Sequelize Model
 */
const seq = require("../seq");
const { BOO, INTEGER } = require("../_types");
const COMMON = require("../../../common");

const { STOCK } = COMMON.validate.attributes;

module.exports = seq.define(
  "Shopping",
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    goods_id: {
      type: INTEGER,
      allowNull: false,
    },
    buyer_id: {
      type: INTEGER,
      allowNull: false,
    },
    count: {
      type: INTEGER,
      allowNull: false,
      defaultValue: STOCK.minimum,
      validate: {
        min: STOCK.minimum,
        max: STOCK.maximum,
      },
    },
    order: {
      type: BOO,
      defaultValue: false,
    },
  },
  {
    paranoid: true,
  }
);
