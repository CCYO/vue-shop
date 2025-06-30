import { defineStore } from "pinia";
import { ref, reactive } from "vue";

import { request } from "@/utils";

import $router from "@/router";

export const useGoodsStore = defineStore("goods", function () {
  let state = reactive({
    hot: {
      list: [],
      total: 0,
      currentPage: 1,
    },
  });
  let types = ref([{ id: 0, zh: "熱門", en: "hot" }]);

  const currentType = ref($router.currentRoute.value.params.type);

  function changeCurrentType(type) {
    currentType.value = type;
  }

  async function requestPage({ offset, limit, type }) {
    const payload = {
      offset,
      limit,
      type,
    };
    let { data } = await request.GOODS.READ(payload);
    const { types, count, list } = data;
    _init(types);
    _insertGoods({ offset, limit }, { list, count });

    function _insertGoods({ offset, limit }, { list, count }) {
      const start = offset;
      const end = offset + limit;
      const obj = state[payload.type];
      if (list.length) {
        for (let n = start, m = 0; end > n; n++, m++) {
          if (list[m]) {
            obj.list[n] = list[m];
          }
        }
      }
      obj.total = count;
      obj.currentPage = Math.ceil((offset + 1) / limit);
    }
  }

  function _init(list) {
    if (types.value.length > 1) {
      return;
    }
    list.forEach(({ id, ind, zh, en }) => {
      types.value[ind] = { id, zh, en };
      state[en] = {
        list: [],
        total: 0,
        currentPage: 1,
      };
    });
  }

  return {
    state,
    types,
    currentType,

    requestPage,
    changeCurrentType,
  };
});
