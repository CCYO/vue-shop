const seq = require("../_seq");
const Seller = require("./Seller");
const Good = require("./Good");
const GoodType = require("./GoodType");
const ShoppingCar = require("./ShoppingCar");
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
Seller.belongsToMany(Good, {
  as: { singular: "goodInCart", plural: "goodsInCart" },
  through: ShoppingCar,
  foreignKey: "seller_id",
  targetKey: "id",
});
Good.belongsToMany(Seller, {
  as: { singular: "buyer", plural: "buyers" },
  through: ShoppingCar,
  foreignKey: "good_id",
  targetKey: "id",
});
//  User : Blog = 1 : N
GoodType.hasMany(Good, {
  as: { singular: "good", plural: "goods" },
  foreignKey: "type_id",
  sourceKey: "id",
});
Good.belongsTo(GoodType, {
  as: "type",
  foreignKey: "type_id",
  targetKey: "id",
  onDelete: "CASCADE",
});
Seller.hasMany(Good, {
  as: { singular: "good", plural: "goods" },
  foreignKey: "seller_id",
  sourceKey: "id",
});
Good.belongsTo(Seller, {
  as: "seller",
  foreignKey: "seller_id",
  targetKey: "id",
  onDelete: "CASCADE",
});

module.exports = {
  seq,
  Seller,
  Good,
  GoodType,
};
