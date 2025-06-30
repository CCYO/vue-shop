import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";
import { request } from "@/utils";
import $router from "@/router";

const defaultUserInfo = {
  id: undefined,
  email: undefined,
  name: undefined,
  city: undefined,
  avatar: undefined,
  avatar_hash: undefined,
  star: undefined,
};

export const useUserStore = defineStore("user", () => {
  const userInfo = reactive({ ...defaultUserInfo });
  const isRegisterTabActive = ref(
    // 提供一個標記，可以藉由輸入網址的方法前往註冊組件
    Boolean($router.currentRoute.value.query.toRegister)
  );

  const ref_from = ref("");

  watch(
    () => userInfo.id,
    async (newValue, oldValue) => {
      let isLogin = Boolean(newValue);
      if (!isLogin) {
        // 前往login組件
        await toLoginPage();
      }
    }
  );

  async function toLoginPage() {
    toggleRegisterTab(false);
    await $router.push({ name: "auth" });
  }
  // 可以決定當前調用 $router.push({ name: 'auth'})時，顯示的是登入or註冊組件
  function toggleRegisterTab(force = false) {
    if (typeof force === "boolean") {
      isRegisterTabActive.value = force;
    } else {
      isRegisterTabActive.value = !isRegisterTabActive.value;
    }
  }

  async function isLogin() {
    // 當前store沒有登入數據
    if (!userInfo.id) {
      let sessionInfo = sessionStorage.getItem("userInfo");
      // sessionStorage存在登入數據
      if (sessionInfo) {
        sessionInfo = JSON.parse(sessionInfo);
      }
      // sessionStorage不存在登入數據，則向後端確認登入狀態
      else {
        sessionInfo = await getUserInfo();
      }
      // 更新store的登入數據
      updateUserInfo(sessionInfo);
    }
    return Boolean(userInfo.id);
  }

  function updateUserInfo(data) {
    Object.assign(userInfo, data);
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    return userInfo;
  }

  async function requestModify(payload) {
    const response = await request.USER.MODIFY(payload);
    if (response.errno) {
      return response.msg;
    }
    updateUserInfo(response.data.item);
    return null;
  }

  // 將userInfo調整為初始狀態(登出狀態)
  // toLoginPage可以決定是否跳轉至登入頁面
  function resetUserInfo(msg) {
    Object.assign(userInfo, defaultUserInfo);
    sessionStorage.removeItem("userInfo");
    if (msg) {
      alert(msg);
      ref_from.value = $router.currentRoute.value.path;
    }
  }
  async function getUserInfo() {
    const { data } = await request.USER.CHECK();
    return data;
  }

  async function logout() {
    await request.USER.LOGOUT();
    resetUserInfo();
  }

  async function login(payload) {
    const { errno, data, msg } = await request.USER.LOGIN(payload);
    if (!errno) {
      updateUserInfo(data);
      if (ref_from.value) {
        await $router.push({ path: ref_from.value });
        ref_from.value = "";
      } else {
        await $router.push({
          name: "goods",
          params: { type: "hot" },
          query: { page: 1 },
        });
      }
    } else {
      return msg;
    }
  }

  async function checkPassword(payload) {
    const response = await request.USER.CHECK_PASSWORD(payload);
    let msg = null;
    if (response.errno) {
      msg = response.msg;
    }
    return msg;
  }

  async function register(payload) {
    const { msg } = await request.USER.REGISTER(payload);
    return msg;
  }

  return {
    userInfo,
    isLogin,
    updateUserInfo,
    resetUserInfo,
    getUserInfo,
    login,
    logout,
    register,
    requestModify,
    checkPassword,

    toggleRegisterTab,
    isRegisterTabActive,
  };
});
