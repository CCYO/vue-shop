/**
 * @description Sequelize Model
 */
const seq = require("../_seq");
const { INTEGER } = require("../_types");
const { COMMON } = require("../../../config");

const { STOCK } = COMMON.validate.attributes;

module.exports = seq.define(
  "ShoppingCar",
  {
    good_id: {
      type: INTEGER,
      allowNull: false,
    },
    seller_id: {
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
  },
  {
    paranoid: true,
  }
);
