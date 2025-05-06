const { Op } = require("sequelize");

const READ = {
  all(data) {
    return {
      where: { ...data },
    };
  },
  type({ offset, limit, type }) {
    const query = {
      attributes: ["id", "name", "price", "on", "onTime", "star", "type_id"],
      include: [
        {
          association: "type",
          attributes: ["id", "en", "zh"],
          where: {
            en: type,
          },
        },
      ],
      offset,
      limit,
    };
    return query;
  },
  count({ type }) {
    return {
      where: {
        "$type.en$": { [Op.eq]: type },
      },
      include: {
        association: "type",
      },
    };
  },
};

module.exports = {
  READ,
};
