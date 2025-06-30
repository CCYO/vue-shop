const { Op } = require("sequelize");

const FIND = {
  pageOfGoodType({ offset, limit, type }) {
    const query = {
      where: {
        "$type.en$": { [Op.eq]: type },
      },
      attributes: [
        "id",
        "name",
        "price",
        "on",
        "onTime",
        "star",
        "type_id",
        "total",
        "selled",
      ],
      include: [
        {
          association: "type",
          attributes: ["id", "en", "zh"],
        },
        {
          association: "seller",
          attributes: ["id", "name", "email", "city", "star", "avatar"],
        },
      ],
      offset,
      limit,
      order: [["updatedAt", "desc"]],
    };
    return query;
  },
};

module.exports = {
  FIND,
};
