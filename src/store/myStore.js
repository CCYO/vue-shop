import { defineStore } from "pinia";
import { reactive } from "vue";

import { request } from "@/utils";

export const useMyStoreStore = defineStore("myStore", () => {
  const goods = reactive({
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
    const { item } = response.data;
    goods.list.push(item);
    const { en } = item.type;
    if (goods.total[en]) {
      goods.total[en]++;
    }
    goods.total.all++;
    return null;
  }
  async function requestRemove(payload) {
    const response = await request.MY_STORE.REMOVE({ data: { ...payload } });
    if (response.errno) {
      return response.msg;
    }
    const index = goods.list.findIndex((item) => item.id === payload.id);
    const {
      type: { en },
    } = goods.list.splice(index, 1)[0];
    if (goods.total[en]) {
      goods.total[en]--;
    }
    goods.total.all--;
    return null;
  }
  async function requestModify(payload) {
    const response = await request.MY_STORE.MODIFY(payload);
    if (response.errno) {
      return response.msg;
    }
    const newData = { ...payload };
    let index = goods.list.findIndex((item) => item.id === newData.id);
    const theGoodsData = goods.list[index];
    // 修改item.type數據
    if (newData.type_id) {
      const newType = goods.types.find((item) => item.id === newData.type_id);
      // 舊分類數據總數-1
      if (goods.total[theGoodsData.type.en]) {
        goods.total[theGoodsData.type.en]--;
      }
      // 新分類數據總數+1
      if (goods.total[newType.en]) {
        goods.total[newType.en]++;
      }
      theGoodsData.type_id = newData.type_id;
      theGoodsData.type = { ...newType };
      delete newData.type_id;
    }
    goods.list[index] = { ...theGoodsData, ...newData };
    return null;
  }
  // 發出取得數據請求
  async function requestGoods({ limit, offset, type_id, order, sort } = {}) {
    const inited = goods.types.length > 1;
    let payload = { inited, limit, offset, type_id, order, sort };
    let response = await request.MY_STORE.READ(payload);
    if (response.errno) {
      return response.msg;
    }
    let { data } = response;
    const { list, count, types } = data;
    // 將遠端取得的數據與本地同步
    if (!inited) {
      goods.types = goods.types.concat(types);
    }
    let newList = list.filter((item) => {
      let some = goods.list.some(({ id }) => item.id === id);
      return !some;
    });
    if (newList.length) {
      goods.list = goods.list.concat(newList);
    }
    let { en } = goods.types.find((item) => item.id === type_id);
    goods.total[en] = count;
    return null;
  }

  return {
    goods,
    requestAdd,
    requestRemove,
    requestModify,
    requestGoods,
  };
});
