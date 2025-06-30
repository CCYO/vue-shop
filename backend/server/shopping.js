const { MySQL } = require("../db");
const { MyErr, init, ERR_RES } = require("../utils");

async function create(query) {
  try {
    let row = await MySQL.Shopping.create(query);
    return init.shoppingCar(row);
  } catch (error) {
    throw new MyErr({ ...ERR_RES.SHOPPING_CAR.CREATE.ERR, error });
  }
}

async function destory(query) {
  try {
    const row = await MySQL.Shopping.destroy(query);
    if (row !== 1) {
      throw new MyErr({
        ...ERR_RES.SHOPPING_CAR.DESTORY.ERR_ROW,
        error: `row: ${row}`,
      });
    }
    return row;
  } catch (error) {
    throw new MyErr({ ...ERR_RES.SHOPPING_CAR.DESTORY.ERR, error });
  }
}

async function bulkUpdate(query, updateNum) {
  const [newData, options] = query;
  try {
    let [row] = await MySQL.Shopping.update(newData, options);
    if (row !== updateNum) {
      throw new MyErr({
        ...ERR_RES.SHOPPING_CAR.UPDATE.ERR_ROW,
        error: `要改的條目共${newData.length}條，卻只有${row}條受影響`,
      });
    }
    return true;
  } catch (error) {
    throw new MyErr({ ...ERR_RES.SHOPPING_CAR.UPDATE.ERR, error });
  }
}

async function update(query) {
  try {
    let [row] = await MySQL.Shopping.update(...query);
    if (row !== 1) {
      throw new MyErr({
        ...ERR_RES.SHOPPING_CAR.UPDATE.ERR_ROW,
        error: `row: ${row}`,
      });
    }
    return true;
  } catch (error) {
    throw new MyErr({ ...ERR_RES.SHOPPING_CAR.UPDATE.ERR, error });
  }
}

async function findAndCount(query) {
  let { count, rows } = await MySQL.Shopping.findAndCountAll(query);
  let list = init.shoppingCar(rows);
  return { list, count };
}

module.exports = {
  create,
  destory,
  update,
  bulkUpdate,
  findAndCount,
};
