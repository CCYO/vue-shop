const {
  default: attributes,
} = require("../../../common/src/validate/attributes");
const { md5 } = require("../hash");

const ADD = {
  register: (data) => ({
    ...data,
    password: md5(data.password),
  }),
};

const REMOVE = {};

const UPDATE = {};

const READ = {
  login(data) {
    return {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      where: { ...data, password: md5(data.password) },
    };
  },
};

module.exports = {
  ADD,
  REMOVE,
  UPDATE,
  READ,
};
