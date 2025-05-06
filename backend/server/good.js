const { MySQL } = require("../db");
const { MyErr, init } = require("../utils");
const { ERR_RES } = require("../config");

async function create(query) {
  try {
    let good = await MySQL.Good.create(query);
    return init.good(good);
  } catch (error) {
    throw new MyErr({ ...ERR_RES.GOOD.CREATE.ERR, error });
  }
}

async function destory(data) {
  try {
    const row = await MySQL.Good.destroy(data);
    if (row !== 1) {
      throw new MyErr({
        ...ERR_RES.GOOD.DESTORY.ERR_ROW,
        error: `row: ${row}`,
      });
    }
    return row;
  } catch (error) {
    throw new MyErr({ ...ERR_RES.GOOD.DESTORY.ERR, error });
  }
}

async function update(query) {
  try {
    let [row] = await MySQL.Good.update(...query);
    if (row !== 1) {
      throw new MyErr({ ...ERR_RES.GOOD.UPDATE.ERR_ROW, error: `row: ${row}` });
    }
    return row;
  } catch (error) {
    throw new MyErr({ ...ERR_RES.GOOD.UPDATE.ERR, error });
  }
}

async function find(query) {
  let result = await MySQL.Good.findAll(query);
  return init.good(result);
}

async function count(query) {
  let num = await MySQL.Good.count(query);
  return num;
}

async function findAndCount(query) {
  let { rows, count } = await MySQL.Good.findAndCountAll(query);
  return { count, goods: init.good(rows) };
}

module.exports = {
  create,
  destory,
  update,
  find,
  count,
  findAndCount,
};
