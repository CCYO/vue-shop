export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/index.vue"),
    meta: {
      title: undefined,
    },
  },
  {
    path: "/",
    name: "layout",
    component: () => import("../layout/index.vue"),
    meta: {
      title: undefined,
    },
    children: [
      {
        path: "/shop",
        name: "shop",
        component: () => import("../views/Shop/index.vue"),
        meta: {
          title: "Vue商城",
        },
        children: [
          {
            path: ":type",
            name: "goods",
            component: () => import("@/views/Shop/Goods/index.vue"),
          },
          {
            path: "/shop",
            redirect: "/shop/hot?page=1",
          },
          {
            path: "/",
            redirect: "/shop/hot?page=1",
          },
        ],
      },
      {
        path: "/shoppingCart",
        name: "shoppingCart",
        component: () => import("../views/ShoppingCart/index.vue"),
        meta: {
          title: "購物車",
        },
      },
      {
        path: "/myStore",
        name: "myStore",
        component: () => import("../views/MyStore/index.vue"),
        meta: {
          title: "我的商城",
        },
      },
      {
        path: "/setting",
        name: "setting",
        component: () => import("../views/Setting/index.vue"),
        meta: {
          title: "個人設置",
        },
      },
      {
        path: "/",
        redirect: "/login",
        meta: {
          title: undefined,
        },
      },
    ],
  },
  // 404
  // {},
  //  redirect 404
  // {}
];
