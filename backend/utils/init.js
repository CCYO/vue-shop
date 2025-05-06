function shoppingCar(data) {
  return _toJSON(data);
}

function seller(data) {
  return _toJSON(data);
}

function good(data) {
  return _toJSON(data);
}

function goodType(data) {
  return _toJSON(data);
}

function _toJSON(row) {
  if (row instanceof Array) {
    return row.map((item) => item.toJSON());
  } else {
    return row.toJSON();
  }
}
module.exports = {
  seller,
  good,
  goodType,
  shoppingCar,
};
