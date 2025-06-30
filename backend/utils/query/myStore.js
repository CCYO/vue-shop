const CREATE = {
  one: (data) => data,
};

const DESTORY = {
  one({ id, seller_id }) {
    return {
      where: {
        id,
        seller_id,
      },
    };
  },
};

const UPDATE = {
  one(data) {
    let { id, seller_id, ...newData } = data;
    const options = { where: { id, seller_id } };
    return [newData, options];
  },
};

const FIND = {
  myGood({ id }) {
    return {
      attributes: [
        "id",
        "name",
        "price",
        "total",
        "selled",
        "type_id",
        "createdAt",
      ],
      where: {
        id,
      },
      include: {
        association: "type",
        attributes: ["id", "zh", "en"],
      },
    };
  },

  myStorePage({ seller_id, limit, offset, type_id, sort, order }) {
    const where = type_id ? { seller_id, type_id } : { seller_id };
    if (order === "type_zh") {
      order = [["type", "zh", sort]];
    } else {
      order = [[order, sort]];
    }
    return {
      attributes: [
        "id",
        "name",
        "price",
        "total",
        "selled",
        "type_id",
        "createdAt",
      ],
      where,
      include: {
        association: "type",
        attributes: ["id", "zh", "en"],
      },
      limit,
      offset,
      order,
    };
  },
};

module.exports = {
  CREATE,
  DESTORY,
  UPDATE,
  FIND,
};
