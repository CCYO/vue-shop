const READ = {
  list(where) {
    return { where };
  },
  one(where) {
    return {
      where,
      attributes: ["id", "good_id", "count"],
    };
  },
};

module.exports = {
  READ,
};
