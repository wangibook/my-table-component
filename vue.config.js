const path = require("path");

const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      // change xxx-api/login => mock/login
      // '/dev-api'
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,   // 目标代理服务器地址
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
  },
  configureWebpack: {
    entry: "./src/main.js",

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      },
    },
  },
};
