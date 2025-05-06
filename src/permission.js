import router from "@/router";
import pinia from "@/store";
import { useUserStore } from "@/store/user";
import { useMyStoreStore } from "@/store/myStore";

let userStore = useUserStore(pinia);
let myStoreStore = useMyStoreStore(pinia);

router.beforeEach(async (to, from) => {
  let replaceTo = undefined;
  let isLogin = await userStore.isLogin();

  if (to.name !== "login" && !isLogin) {
    userStore.toggleRegisterTab(false);
    replaceTo = { name: "login", replace: true };
  } else if (to.name === "login" && isLogin) {
    replaceTo = { name: "shop", path: "/shop/", replace: true };
  }

  // 如果是goods，要請求相關陳列數據
  else if (to.name === "goods") {
  } else if (to.name === "shop") {
  } else if (to.name === "myStore") {
  }

  if (replaceTo !== undefined) {
    return replaceTo;
  }
  return true;
});
