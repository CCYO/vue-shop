import { defineStore } from "pinia";
import { reactive, ref } from "vue";

import { request } from "@/utils";

export const useShoppingStore = defineStore("shopping", () => {
  // map { goods_id => { ...goods數據, seller: 賣家數據, type: goodsType數據 } }
  const store = reactive(new Map());
  // 後端數據庫「當前使用者購物車數據」的總數
  const total = reactive({
    order: 0,
    unOrder: 0,
  });

  async function requestAdd(payload) {
    const response = await request.SHOPPING.ADD(payload);
    if (response.errno) {
      return response.msg;
    }
    // 同步數據
    const { goods_id } = response.data.item;
    store.set(goods_id, response.data.item);
  }

  async function requestRemove(payload) {
    const { id } = payload;
    const response = await request.SHOPPING.REMOVE({ data: { id } });
    if (response.errno) {
      return response.msg;
    }
    // 同步數據
    const { order, goods } = [...store.values()].find((item) => item.id === id);
    store.delete(goods.id);
    let status = order ? "order" : "unOrder";
    total[status] -= 1;
  }

  async function order(payload) {
    const response = await request.SHOPPING.ORDER(payload);
    if (response.errno) {
      return response.msg;
    }
    // 已下單的數據處理
    const { id_list } = payload;
    store.forEach((goods, id) => {
      if (id_list.includes(id)) {
        goods.order = true;
      }
    });
  }
  async function requestModify(payload) {
    const response = await request.SHOPPING.MODIFY(payload);
    if (response.errno) {
      return response.msg;
    }
    // 同步數據
    store.set(payload.goods_id, payload);
    return null;
  }
  async function requestGoods(payload) {
    const { goods_id } = payload;
    // 確認本地是否有數據
    const exist = store.has(goods_id);
    if (!exist) {
      const response = await request.SHOPPING.READ(payload);
      // 後端數據庫還未設置
      if (response.errno) {
        store.set(goods_id, { goods_id, count: 0, id: null });
      } else {
        store.set(goods_id, response.data);
      }
    }
    return null;
  }
  async function requestList(payload, options) {
    const response = await request.SHOPPING.READ_LIST(payload, options);
    if (response.errno) {
      return response.msg;
    }
    const { list, count } = response.data;
    const { order } = payload;
    const status = order ? "order" : "unOrder";
    total[status] = count;
    list.forEach(({ goods_id, ...value }) => {
      store.set(goods_id, value);
    });
    return null;
  }

  return {
    store,
    total,
    requestAdd,
    requestRemove,
    requestModify,
    order,
    requestGoods,
    requestList,
  };
});
