import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "@/styles/index.scss";
import "./permission";

import { createApp } from "vue";
import { createBootstrap } from "bootstrap-vue-next";

import App from "./App.vue";
import pinia from "@/store";
import $router from "./router";

import { useStatusStore } from "@/store/status";
import { useUserStore } from "@/store/user";
const statusStore = useStatusStore(pinia);
const userStore = useUserStore(pinia);

const app = createApp(App);
app.config.errorHandler = errorHandler;
app.use(createBootstrap());
app.use(pinia);
app.use($router);

app.mount("#app");

async function errorHandler(error, vm, info) {
  if (error.status === 500) {
    statusStore.reload({ prefix: error.msg });
  } else if (error.status === 401) {
    userStore.resetUserInfo(error.msg);
  } else {
    console.log("vue3 errorhandle");
    console.log("error", error);
    console.log("info", info);
  }
}
