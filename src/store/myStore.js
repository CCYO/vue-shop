import { defineStore } from "pinia";
import { reactive } from "vue";

import { request } from "@/utils";

export const useMyStoreStore = defineStore("myStore", () => {
  const good = reactive({
    list: [],
    total: {
      all: 0,
    },
    types: [{ id: undefined, en: "all", zh: "所有" }],
  });

  async function requestAdd(payload) {
    const response = await request.MY_STORE.ADD(payload);
    if (response.errno) {
      return response.msg;
    }
    const newGood = response.data.good;
    good.list.push(newGood);
    const { en } = newGood.type;
    if (good.total[en]) {
      good.total[en]++;
    }
    good.total.all++;
    return null;
  }
  async function requestRemove(payload) {
    const response = await request.MY_STORE.REMOVE(payload);
    if (response.errno) {
      return response.msg;
    }
    const index = good.list.findIndex((item) => item.id === payload.id);
    const {
      type: { en },
    } = good.list.splice(index, 1)[0];
    if (good.total[en]) {
      good.total[en]--;
    }
    good.total.all--;
    return null;
  }
  async function requestModify(payload) {
    const response = await request.MY_STORE.MODIFY(payload);
    if (response.errno) {
      return response.msg;
    }
    const newData = { ...payload };
    let index = good.list.findIndex((item) => item.id === newData.id);
    const theGoodData = good.list[index];
    // 修改item.type數據
    if (newData.type_id) {
      const newType = good.types.find((item) => item.id === newData.type_id);
      // 舊分類數據總數-1
      if (good.total[theGoodData.type.en]) {
        good.total[theGoodData.type.en]--;
      }
      // 新分類數據總數+1
      if (good.total[newType.en]) {
        good.total[newType.en]++;
      }
      theGoodData.type_id = newData.type_id;
      theGoodData.type = { ...newType };
      delete newData.type_id;
    }
    good.list[index] = { ...theGoodData, ...newData };
    return null;
  }
  // 發出取得數據請求
  async function requestGoods({ limit, offset, type_id, order, sort } = {}) {
    const inited = good.types.length > 1;
    let payload = { inited, limit, offset, type_id, order, sort };
    let response = await request.MY_STORE.READ(payload);
    if (response.errno) {
      return response.msg;
    }
    let { data } = response;
    // 將遠端取得的數據與本地同步
    if (!inited) {
      good.types = good.types.concat(data.types);
    }
    let newList = data.goods.filter((item) => {
      let some = good.list.some(({ id }) => item.id === id);
      return !some;
    });
    if (newList.length) {
      good.list = good.list.concat(newList);
    }
    let { en } = good.types.find((item) => item.id === type_id);
    good.total[en] = data.count;
    return null;
  }

  return {
    good,
    requestAdd,
    requestRemove,
    requestModify,
    requestGoods,
  };
});
