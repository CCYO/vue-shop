import { defineStore } from "pinia";
import { ref, reactive } from "vue";

import { request } from "@/utils";

import $router from "@/router";

export const useGoodStore = defineStore("goods", function () {
  let state = reactive({
    hot: {
      list: [],
      total: 0,
      currentPage: 1,
    },
  });
  let types = ref([]);

  const currentType = ref($router.currentRoute.value.params.type);

  function changeCurrentType(type) {
    currentType.value = type;
  }

  async function requestGoods({ offset, limit, type }) {
    const payload = {
      offset,
      limit,
      type,
    };
    let { data } = await request.GOOD.READ(payload);

    _init(data.types);
    _insertGoods({ offset, limit }, data);

    function _insertGoods({ offset, limit }, { goods, total }) {
      const start = offset;
      const end = offset + limit;
      const obj = state[payload.type];
      if (goods.length) {
        for (let n = start, m = 0; end > n; n++, m++) {
          if (goods[m]) {
            obj.list[n] = goods[m];
          }
        }
      }
      obj.total = total;
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

    requestGoods,
    changeCurrentType,
  };
});
