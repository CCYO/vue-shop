const { md5 } = require("../hash");

const CREATE = {
  register: (data) => ({
    ...data,
    password: md5(data.password),
  }),
};

const UPDATE = {
  one(data) {
    let { id, password, ...newData } = data;
    if (password) {
      newData.password = md5(password);
    }
    const options = { where: { id } };
    return [newData, options];
  },
};

const FIND = {
  responseBySetting(id) {
    return {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
      where: { id },
    };
  },
  checkPassword({ id, password }) {
    return {
      attributes: ["id"],
      where: {
        id,
        password: md5(password),
      },
    };
  },
  login(data) {
    return {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
      where: { ...data, password: md5(data.password) },
    };
  },
};

module.exports = {
  CREATE,
  UPDATE,
  FIND,
};
