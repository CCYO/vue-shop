import Axios from "axios";

import pinia from "@/store";
import { useStatusStore } from "@/store/status";
const statusStore = useStatusStore(pinia);

const api = Axios.create({
  baseURL: "/api",
  // 轉場載入動畫
  _transitionModal: true,
});

api.interceptors.request.use((config) => {
  if (config._transitionModal) {
    statusStore.loadstart();
  }
  return config;
});
api.interceptors.response.use(_resolve, _reject);

function _resolve(response) {
  if (response.config._transitionModal) {
    statusStore.loadend();
  }
  return response.data;
}

function _reject(error) {
  let errorModel = error.response.data;
  const { status } = error.response;
  if (status >= 500) {
    errorModel = { status: 500, msg: "伺服器發生未知錯誤" };
  } else if (status === 401) {
    errorModel = { status, msg: "登入已過期，請重新登入" };
  }
  return Promise.reject(errorModel);
}

export default api;
