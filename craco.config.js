const path = require("path");

const CracoLessPlugin = require("craco-less");
const CompressionPlugin = require("compression-webpack-plugin");

const resolve = (dir) => path.resolve(__dirname, dir);

if (process.env.NODE_ENV === "production") {
  // 关闭 source-map
  process.env.GENERATE_SOURCEMAP = "false";
}

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  webpack: {
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
    },
    plugins: [
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.(js|json|css)$/,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false, // 删除原文件
      }),
    ],
  },
};
