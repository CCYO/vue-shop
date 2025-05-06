function toObj(queryString) {
  const obj = {};
  for (let key in queryString) {
    let value = queryString[key];
    if (value === "true") {
      obj[key] = true;
    } else if (value === "false") {
      obj[key] = false;
    } else if (!Number.isNaN(value * 1)) {
      obj[key] = value * 1;
    } else {
      obj[key] = queryString[key];
    }
  }
  return obj;
}

module.exports = {
  toObj,
};
