const { MySQL } = require("../db");
//  sequelize transaction
module.exports = async function (ctx, next) {
  return MySQL.seq.transaction(async (t) => {
    await next();
  });
};
