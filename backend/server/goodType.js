const { MySQL } = require("../db");
const { init } = require("../utils");

async function find(data) {
  let result = await MySQL.GoodType.findAll(data);
  return init.goodType(result);
}

module.exports = {
  find,
};
