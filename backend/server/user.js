const { MySQL } = require("../db");
const { MyErr, init, ERR_RES } = require("../utils");

async function create(query) {
  try {
    let row = await MySQL.User.create(query);
    return init.user(row);
  } catch (error) {
    let e = new MyErr({ ...ERR_RES.USER.CREATE.ERR, error });
    throw e;
  }
}

async function update(query) {
  try {
    let [row] = await MySQL.User.update(...query);
    if (row !== 1) {
      throw new MyErr({
        ...ERR_RES.USER.UPDATE.ERR_ROW,
        error: `row: ${row}`,
      });
    }
    return row;
  } catch (error) {
    throw new MyErr({ ...ERR_RES.USER.UPDATE.ERR, error });
  }
}

async function find(query) {
  let result = await MySQL.User.findAll(query);
  return init.user(result);
}

module.exports = {
  create,
  update,
  find,
};
