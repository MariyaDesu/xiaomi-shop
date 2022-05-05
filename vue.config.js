// webpack使用
module.exports = {
  publicPath:"./",
  css: {
    loaderOptions: {
      scss: {
        // @/ 是 src/ 的别名
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"，其他是："additionalData"
        prependData: `@import "@/assets/scss/index.scss";` //引入全局变量   
      }
    }
  },
  devServer: {
    host: 'localhost', // 设置主机地址
    port: 8080, // 设置默认端口
    proxy: { // 设置代理
      // 拦截
      '/api': {
        target: 'http://mall-pre.springboot.cn', // 代理的目标URL地址
        ws: true, // 如果要代理 websockets
        changeOrigin: true, // 是否要将host地址更改为target地址
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
}