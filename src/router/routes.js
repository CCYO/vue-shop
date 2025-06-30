export default [
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/Auth/index.vue"),
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
        path: "/mall",
        name: "mall",
        component: () => import("../views/Mall/index.vue"),
        meta: {
          title: "Vue商城",
        },
        children: [
          {
            path: ":type",
            name: "goods",
            component: () => import("@/views/Mall/Goods/index.vue"),
          },
          {
            path: "/mall",
            redirect: "/mall/hot?page=1",
          },
          {
            path: "/",
            redirect: "/mall/hot?page=1",
          },
        ],
      },
      {
        path: "/shopping",
        name: "shopping",
        component: () => import("../views/Shopping/index.vue"),
        meta: {
          title: "購物車",
        },
        children: [
          {
            path: "car",
            name: "car",
            component: () => import("@/views/Shopping/Car/index.vue"),
          },
          {
            path: "order",
            name: "order",
            component: () => import("@/views/Shopping/Order/index.vue"),
          },
          {
            path: "/shopping",
            redirect: "/shopping/car",
          },
        ],
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
