const ADD = {
  one: (data) => data,
};

const REMOVE = {
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

const READ = {
  count({ type_id, seller_id }) {
    return {
      where: {
        seller_id,
        type_id,
      },
    };
  },

  myGood({ seller_id, id }) {
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
        seller_id,
      },
      include: {
        association: "type",
        attributes: ["id", "zh", "en"],
      },
    };
  },

  myStorePage({ seller_id, limit, offset, type_id, sort, order }) {
    const where = type_id ? { seller_id, type_id } : { seller_id };
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
      order: [[order, sort]],
    };
  },
};

module.exports = {
  ADD,
  REMOVE,
  UPDATE,
  READ,
};
