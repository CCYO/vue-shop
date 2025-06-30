const User = require("./User");
const Goods = require("./Goods");
const GoodsType = require("./GoodsType");
const Shopping = require("./Shopping");
/**
 * 1:1 與 1: N
 * onDelete: 'SET NULL'
 * onUpdate: 'CASCADE'
 *
 * 1: N
 * onDelete: 'NO ACTION' → 我觀察到的，網路資料卻都說是 SET NULL
 * onUpdate: 'CASCADE'
 *
 * N:M
 * onDelete: 'CASCADE'
 * onUpdate: 'CASCADE'
 */

//  SourceModel 作為 foreignKey 的來源，
//  as 是 TargetModel 的別名，
User.belongsToMany(Goods, {
  as: { singular: "goodsOfBuyer", plural: "goodsListOfBuyer" },
  through: Shopping,
  foreignKey: "buyer_id",
  targetKey: "id",
});
Goods.belongsToMany(User, {
  as: { singular: "buyerOfGoods", plural: "buyerListOfGoods" },
  through: Shopping,
  foreignKey: "goods_id",
  targetKey: "id",
});
Shopping.belongsTo(User, {
  as: "itemToBuyer",
  foreignKey: "buyer_id",
  targetKey: "id",
  onDelete: "CASCADE",
});

Shopping.belongsTo(Goods, {
  as: "itemToGoods",
  foreignKey: "goods_id",
  targetKey: "id",
  onDelete: "CASCADE",
});
//  User : Blog = 1 : N
GoodsType.hasMany(Goods, {
  as: { singular: "goods", plural: "goodsList" },
  foreignKey: "type_id",
  sourceKey: "id",
});
Goods.belongsTo(GoodsType, {
  as: "type",
  foreignKey: "type_id",
  targetKey: "id",
  onDelete: "CASCADE",
});
User.hasMany(Goods, {
  as: { singular: "goods", plural: "goodsList" },
  foreignKey: "seller_id",
  sourceKey: "id",
});
Goods.belongsTo(User, {
  as: "seller",
  foreignKey: "seller_id",
  targetKey: "id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Goods,
  GoodsType,
  Shopping,
};
