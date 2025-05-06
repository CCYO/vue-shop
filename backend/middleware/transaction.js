const { seq } = require("../db/mysql");
//  sequelize transaction
module.exports = async function (ctx, next) {
  return seq.transaction(async (t) => {
    await next();
  });
};
