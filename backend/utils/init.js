const { AVATAR } = require("../config");

function shoppingCar(data) {
  const json = _toJSON(data);
  if (Array.isArray(json)) {
    return json.map(_init);
  } else {
    return _init(json);
  }
  function _init(item) {
    const { itemToGoods, ...shoppingCarData } = item;
    if (itemToGoods) {
      const { seller, ...goodsData } = itemToGoods;
      shoppingCarData.goods = { ...goodsData };
      if (seller) {
        shoppingCarData.goods.seller = init.user(seller);
      }
    }
    return shoppingCarData;
  }
}

function user(data) {
  const json = _toJSON(data);
  if (Array.isArray(json)) {
    return json.map(_init);
  } else {
    return _init(json);
  }
  function _init(item) {
    const { avatar, ...sellerData } = item;
    if (!avatar && item.hasOwnProperty("avatar")) {
      sellerData.avatar = AVATAR.URL;
      sellerData.avatar_hash = AVATAR.HASH;
    } else {
      sellerData.avatar = avatar;
    }
    return sellerData;
  }
}

function goods(data) {
  return _toJSON(data);
}

function goodsType(data) {
  return _toJSON(data);
}

function _toJSON(row) {
  if (row instanceof Array) {
    return row.map(_parse);
  } else {
    return _parse(row);
  }

  function _parse(item) {
    let res = item;
    if (typeof item.toJSON === "function") {
      res = item.toJSON();
    }
    return res;
  }
}

const init = {
  user,
  goods,
  goodsType,
  shoppingCar,
};

module.exports = init;
