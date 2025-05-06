import { defineStore } from "pinia";
import { reactive } from "vue";

import { request } from "@/utils";

export const useShoppingCartStore = defineStore("shoppingCar", () => {
  const store = reactive(new Map());

  async function requestAdd(payload) {
    const response = await request.SHOPPING_CART.ADD(payload);
    if (response.errno) {
      return response.msg;
    }
    // 同步數據
    let index = state.list.findIndex(
      ({ type, id }) => item.type === type && item.id === id
    );
    if (index < 0) {
      state.list.push(item);
    } else {
      state.list[index].num += item.num;
    }
  }

  async function requestGood(payload) {
    const response = await request.SHOPPING_CART.READ(payload);
    if (response.errno) {
      return response.msg;
    }
    if (store.has(payload.good_id)) {
      Object.assign(store.get(good_id), response.data);
    } else {
      store.set(good_id, response.data);
    }
    return null;
  }
  return { store, requestAdd, requestGood };
});
