import { defineStore } from "pinia";
import { ref, nextTick } from "vue";

export const useStatusStore = defineStore("status", () => {
  const loading = ref(false);
  const isRouterAlive = ref(true);

  function reload({ prefix = "", msg = "", noAlert = false } = {}) {
    if (!noAlert) {
      let _msg = "頁面將重新整理。";
      if (msg) {
        _msg = msg;
      } else if (prefix) {
        _msg = `${prefix}，${_msg}`;
      }
      alert(_msg);
    }
    isRouterAlive.value = false;
    nextTick(() => {
      loadend();
      isRouterAlive.value = true;
    });
  }

  function loadstart() {
    console.log("--loadstart--");
    loading.value = true;
  }

  function loadend() {
    console.log("--loadend--");
    loading.value = false;
  }

  return {
    isRouterAlive,
    loading,
    loadstart,
    loadend,
    reload,
  };
});
