/**
 * @description Sequelize Model
 */
const seq = require("../seq");
const { STRING, INTEGER } = require("../_types");
const COMMON = require("../../../common");

const { HASH, NAME, CITY, STAR } = COMMON.validate.attributes;

module.exports = seq.define(
  "User",
  {
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        is: HASH.regexp,
      },
    },
    email: {
      type: STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: STRING(NAME.maxLength),
      unique: true,
      allowNull: false,
      validate: {
        is: NAME.regexp,
        len: [NAME.minLength, NAME.maxLength],
      },
    },
    avatar: {
      type: STRING,
      validate: {
        isUrl: true,
      },
    },
    avatar_hash: {
      type: STRING,
      validate: {
        is: HASH.regexp,
      },
    },
    city: {
      type: STRING,
      validate: {
        is: CITY.regexp,
        len: [CITY.minLength, CITY.maxLength],
      },
    },
    star: {
      type: INTEGER,
      defaultValue: 1,
      validate: {
        min: STAR.minimum,
        max: STAR.maximum,
      },
    },
  },
  {
    paranoid: true,
  }
);
