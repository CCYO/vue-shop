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
    Boolean($router.currentRoute.value.query.toRegister)
  );
  const needRedirect = ref(true);

  watch(
    () => userInfo.id,
    async (newValue, oldValue) => {
      if (newValue) {
        return;
      }
      toggleRegisterTab(false);
      if (needRedirect.value) {
        isRegisterTabActive.value = false;
        await $router.push({ name: "login" });
        needRedirect.value = true;
      } else {
        needRedirect.value = false;
      }
      return;
    }
  );

  function toggleRegisterTab(force) {
    if (force === undefined) {
      isRegisterTabActive.value = !isRegisterTabActive.value;
    } else {
      isRegisterTabActive.value = Boolean(force);
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
    if (!data) {
      return null;
    } else {
      Object.assign(userInfo, data);
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      return userInfo;
    }
  }
  function resetUserInfo(toLoginPage = true) {
    needRedirect.value = toLoginPage;
    Object.assign(userInfo, defaultUserInfo);
    sessionStorage.removeItem("userInfo");
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
    } else {
      return msg;
    }
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

    toggleRegisterTab,
    isRegisterTabActive,
  };
});
