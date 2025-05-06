const { MySQL } = require("../db");
const { init } = require("../utils");

async function find(query) {
  let result = await MySQL.ShoppingCar.find(query);
  return init.shoppingCar(result);
}

module.exports = {
  find,
};
