const { MySQL } = require("../db");
const { MyErr, init } = require("../utils");
const { ERR_RES } = require("../config");

async function create(query) {
  try {
    let row = await MySQL.Seller.create(query);
    return init.seller(row);
  } catch (error) {
    let e = new MyErr({ ...ERR_RES.SELLER.CREATE.ERR, error });
    throw e;
  }
}

// async function destory(data) {
//   try {
//     const row = await MySQL.Seller.destroy(data);
//     if (row !== 1) {
//       throw new MyErr({
//         ...ERR_RES.GOOD.DESTORY.ERR_ROW,
//         error: `row: ${row}`,
//       });
//     }
//     return row;
//   } catch (error) {
//     throw new MyErr({ ...ERR_RES.GOOD.DESTORY.ERR, error });
//   }
// }

// async function update(data) {
//   try {
//     let [row] = await MySQL.Seller.update(data);
//     if (row !== 1) {
//       throw new MyErr({ ...ERR_RES.GOOD.UPDATE.ERR_ROW, error: `row: ${row}` });
//     }
//     return row;
//   } catch (error) {
//     throw new MyErr({ ...ERR_RES.GOOD.UPDATE.ERR, error });
//   }
// }

async function find(query) {
  let result = await MySQL.Seller.findAll(query);
  return init.seller(result);
}

module.exports = {
  create,
  find,
  // count,
};
