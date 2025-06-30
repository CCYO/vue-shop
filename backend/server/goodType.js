const { MySQL } = require("../db");
const { init } = require("../utils");

async function find(data) {
  let rows = await MySQL.GoodsType.findAll(data);
  return init.goodsType(rows);
}

module.exports = {
  find,
};
