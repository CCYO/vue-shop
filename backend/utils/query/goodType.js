const { Op } = require("sequelize");
const FIND = {
  all(data) {
    if (!data) {
      data = { id: { [Op.not]: null } };
    }
    return {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { ...data },
      order: [["ind"]],
    };
  },
};

module.exports = {
  FIND,
};
