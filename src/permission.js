import router from "@/router";
import pinia from "@/store";
import { useUserStore } from "@/store/user";

let userStore = useUserStore(pinia);

router.beforeEach(async (to, from) => {
  let replaceTo = undefined;
  let isLogin = await userStore.isLogin();

  if (to.name !== "auth" && !isLogin) {
    // 跳轉至login組件
    userStore.toggleRegisterTab(false);
    replaceTo = { name: "auth", replace: true };
  } else if (to.name === "auth") {
    if (isLogin) {
      replaceTo = { name: "mall", path: "/mall/", replace: true };
    } else {
      const url = new URL(location.href);
      if (url.searchParams.get("toRegister") === "true") {
        userStore.toggleRegisterTab(true);
      }
    }
  } else if (to.name === "goods") {
  } else if (to.name === "shop") {
  } else if (to.name === "myStore") {
  }

  if (replaceTo !== undefined) {
    return replaceTo;
  }
  return true;
});
