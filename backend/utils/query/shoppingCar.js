const { Op } = require("sequelize");

const CREATE = {
  one: (data) => data,
};

const DESTORY = {
  one({ id }) {
    return {
      where: {
        id,
      },
    };
  },
};

const UPDATE = {
  one(data) {
    let { count, ...where } = data;
    const options = { where };
    const newData = { count };
    return [newData, options];
  },
  order({ id_list }) {
    let options = {
      where: {
        id: { [Op.in]: id_list },
        order: false,
      },
    };
    const newData = { order: true };
    // id_list.length 作為server的驗證
    return [newData, options];
  },
};

const FIND = {
  readListOfShoppingCar({ buyer_id, offset, limit, order }) {
    return {
      where: { buyer_id, order },
      offset,
      limit,
      order: [["updatedAt", "desc"]],
      attributes: ["id", "goods_id", "count", "order", "updatedAt"],
      include: {
        association: "itemToGoods",
        attributes: ["id", "name", "price", "total", "selled"],
        include: [
          {
            association: "seller",
            attributes: ["id", "name", "city", "star", "avatar"],
          },
          {
            association: "type",
            attributes: ["id", "en", "zh"],
          },
        ],
      },
    };
  },
  one(where) {
    return {
      where,
      attributes: ["id", "goods_id", "count", "updatedAt"],
      include: {
        association: "itemToGoods",
        attributes: ["id", "name", "price", "total", "selled"],
        include: [
          {
            association: "seller",
            attributes: ["id", "name", "city", "star", "avatar"],
          },
          {
            association: "type",
            attributes: ["id", "en", "zh"],
          },
        ],
      },
    };
  },
};

module.exports = {
  CREATE,
  DESTORY,
  UPDATE,
  FIND,
};
