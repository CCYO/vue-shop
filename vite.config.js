import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

import Components from "unplugin-vue-components/vite";
import { BootstrapVueNextResolver } from "bootstrap-vue-next";

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@use '@/styles/variable.scss' as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        outDir: "dist",
        // JS 檔案輸出位置
        entryFileNames: "js/[name].js",
        // 動態載入 chunk
        chunkFileNames: "js/[name]-[hash].js",
        // 資源類型的輸出規則
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split(".").pop();

          if (["css"].includes(ext)) {
            return "css/[name]-[hash][extname]";
          }
          if (["png", "jpg", "jpeg", "gif", "svg"].includes(ext)) {
            return "img/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  // 通常適用範圍是開發環境
  server: {
    // proxy: {
    //   "/api": "http://localhost:8082",
    // },

    // 指定服務監聽的地址（true與0.0.0.0代表所有地址）
    // host: 'localhost'(default),
    // host: "dev-vue-shop.ccyo.work",

    // 允許響應的主機名，default為localhost以及.localhost（子域）
    // 若非上述與localhost相關的域名，則需手動指定（例如有Nginx代理時）
    allowedHosts: ["dev-vue-shop.ccyo.work"],
  },
});
