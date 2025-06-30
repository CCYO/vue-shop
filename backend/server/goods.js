const { MySQL } = require("../db");
const { MyErr, init, ERR_RES } = require("../utils");

async function create(query) {
  try {
    let good = await MySQL.Goods.create(query);
    return init.goods(good);
  } catch (error) {
    throw new MyErr({ ...ERR_RES.GOODS.CREATE.ERR, error });
  }
}

async function destory(data) {
  try {
    const row = await MySQL.Goods.destroy(data);
    if (row !== 1) {
      throw new MyErr({
        ...ERR_RES.GOODS.DESTORY.ERR_ROW,
        error: `row: ${row}`,
      });
    }
    return row;
  } catch (error) {
    throw new MyErr({ ...ERR_RES.GOODS.DESTORY.ERR, error });
  }
}

async function update(query) {
  try {
    let [row] = await MySQL.Goods.update(...query);
    if (row !== 1) {
      throw new MyErr({
        ...ERR_RES.GOODS.UPDATE.ERR_ROW,
        error: `row: ${row}`,
      });
    }
    return row;
  } catch (error) {
    throw new MyErr({ ...ERR_RES.GOODS.UPDATE.ERR, error });
  }
}

async function findAndCount(query) {
  let { rows, count } = await MySQL.Goods.findAndCountAll(query);
  return { count, list: init.goods(rows) };
}

module.exports = {
  create,
  destory,
  update,
  findAndCount,
};
