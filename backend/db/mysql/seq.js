/**
 * @description Sequelize Ins
 */

/* CONFIG     ----------------------------------------------------------------------------- */
const { MYSQL: CONFIG } = require("../../_config");
const {
  MYSQL: { GoodsType },
} = require("../../config");
/* NPM        ----------------------------------------------------------------------------- */
const { Sequelize } = require("sequelize");
const cls = require("cls-hooked");
const namespace = cls.createNamespace("seq-namespace");

const { log } = require("../../utils");

Sequelize.useCLS(namespace);
const seq = new Sequelize({ ...CONFIG, logging: false });

module.exports = seq;

seq
  .authenticate()
  .catch((error) => {
    console.error("Sequalize 連線失敗：\n", error);
    throw error;
  })
  .then(async () => {
    log("Seqalize 連線成功");
    return await init();
  });

async function init() {
  const model = require("./model");
  //   初始化GoodsType表
  if ((await model.GoodsType.count()) === GoodsType.LIST.length) {
    return;
  }
  try {
    await model.GoodsType.bulkCreate(GoodsType.LIST);
    log("GoodsType表初始化成功");
  } catch (error) {
    console.error("GoodsType表初始化失敗:", error);
    throw error;
  }
}
