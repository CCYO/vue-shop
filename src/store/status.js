import { defineStore } from "pinia";
import { ref, nextTick } from "vue";

export const useStatusStore = defineStore("status", () => {
  const loading = ref(false);
  const isRouterAlive = ref(true);

  function reload(msg) {
    let alertMsg = "頁面將重新整理。";
    if (msg) {
      alertMsg = `${msg}，${alertMsg}`;
    }
    alert(alertMsg);
    isRouterAlive.value = false;
    nextTick(() => {
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
    loadend,
    loadstart,
    reload,
  };
});
