import path from "path";

export default {
  build: {
    sourcemap: true,
    // 壓縮
    minify: false,
    // 打包結果的存放位置
    outDir: path.resolve(__dirname, "../backend/common"),
    // 打包前清空outDir，若outDir位於vite.config.js的外部層級，默認false
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "src/main.js"),
      },
      // 避免npm包被作為打包對象
      // external: (id) => {
      //   return !id.startsWith(".") && !path.isAbsolute(id);
      // },
      output: {
        format: "cjs",
        // 打包結果的輸出形式（須配合入口文件的輸出方式）
        exports: "named",
        // 保留目錄結構
        preserveModules: true,
        entryFileNames: "[name].js",
      },
      // 打包結果若要保留打包前的資料結構，需設定output.preserveModules: true，同時preserveEntrySignatures不能是默認值false
      preserveEntrySignatures: "strict",
    },
  },
};
