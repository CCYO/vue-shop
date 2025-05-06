/**
 * @description Sequelize Ins
 */

/* CONFIG     ----------------------------------------------------------------------------- */
const { MYSQL } = require("../../_config");

/* NPM        ----------------------------------------------------------------------------- */
const { Sequelize } = require("sequelize");
const cls = require("cls-hooked");

/* UTILS      ----------------------------------------------------------------------------- */
const { log } = require("../../utils");

const namespace = cls.createNamespace("seq-namespace");
Sequelize.useCLS(namespace);
const seq = new Sequelize({ ...MYSQL, logging: false });

//  連線測試
seq
  .authenticate()
  .then(() => log("Seqalize 已連結"))
  .then(async () => {
    // await seq.sync({
    //   alter: true,
    //   force: true
    // });
    log("Seqalize 已同步");
  })
  .catch((e) => console.error("Sequalize 連結發生錯誤 ===> \n", e));

module.exports = seq;
